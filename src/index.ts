import spawn from 'cross-spawn';
import degit from 'degit';
import minimist from 'minimist';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import colors from 'picocolors';
import prompts from 'prompts';
import { FrameworkType, StackType, UiType } from './types';
import { formatDir, isEmpty, pkgFromUserAgent, removeDir } from './utils';
import templates from './templates';

export const HELP_MESSAGE = `\
Usage: create-runow [OPTION]... [DIRECTORY]

Create a new Runow project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
`;

const { red, green, reset } = colors;

const maps = templates.flatMap(f => f.items || []).flatMap(f => f.items || []).flatMap(f=> f.names || []);

const argv = minimist<{
  template?: string;
  help?: boolean;
}>(process.argv.slice(2), {
  default: {
    help: false,
  },
  alias: {
    h: 'help',
    t: 'template',
  },
});

const cwd = process.cwd();

const defaultDir = 'runow-project';

async function run() {
  // app target dir
  const argvDir = formatDir(argv._[0]);
  const argvTemplate = argv.template || argv.t;

  if (argv.help) {
    console.log(HELP_MESSAGE);
    return;
  }

  let targetDir = argvDir || defaultDir;

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'stack' | 'framework' | 'template'
  >;

  prompts.override({
    overwrite: argv.overwrite,
  });

  try {
    result = await prompts(
      [
        {
          type: argvDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultDir,
          onState: (state) => {
            targetDir = formatDir(state.value) || defaultDir;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select',
          name: 'overwrite',
          message:
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: 'Cancel operation',
              value: 'no',
            },
            {
              title: 'Remove existing files and continue',
              value: 'yes',
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type:
            argvTemplate && maps.includes(argvTemplate) ? null : 'select',
          name: 'stack',
          message:
            typeof argvTemplate === 'string' &&
            !maps.includes(argvTemplate)
              ? reset(
                  `"${argvTemplate}" isn't a valid template. Please choose from below: `,
                )
              : reset('Select a stack:'),
          initial: 0,
          choices: templates.map((stack) => {
            const render = stack.color
            return {
              title: render(stack.display),
              value: stack,
            };
          }),
        },
        {
          type: (stack: StackType | /* package name */ string) =>
            typeof stack === 'object' ? 'select' : null,
          name: 'framework',
          message: reset('Select a framework:'),
          choices: (stack: StackType) =>
            stack.items.map((framework) => {
              return {
                title: framework.display,
                value: framework,
              };
            }),
        },
        {
          type: (framework: FrameworkType | /* package name */ string) =>
            typeof framework === 'object' ? 'select' : null,
          name: 'template',
          message: reset('Select a UI:'),
          choices: (framework: FrameworkType) =>
            framework.items.map((ui) => {
              return {
                title: ui.display,
                value: ui,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (e: any) {
    console.log(e.message);
    return;
  }

  const { overwrite, template } = result;

  const root = path.join(cwd, targetDir);

  const templateDir = path.relative(cwd, targetDir);

  // remove target dir
  if (overwrite === 'yes') {
    removeDir(root);
  }

  let targetTemplate: UiType | undefined

  if (template) {
    targetTemplate = template
  } else {
    targetTemplate = templates.flatMap(f=> f.items || []).flatMap(f=> f.items || []).find(f=>f.names.includes(argvTemplate))
  }

  if (!targetTemplate) {
    console.log(red('No corresponding template found, it may not have been published or taken down!'))
    return;
  }

  const repo =
    'https://github.com/runowjs/templates/' + targetTemplate.path;

  const spinner = ora(
    `Cloning ${targetTemplate.names[0]} template into ${templateDir}...`,
  ).start();

  const emitter = degit(repo, {
    cache: false,
    force: true,
    verbose: true,
  });

  emitter.on('info', (info) => {
    spinner.text = info.message;
  });

  try {
    await emitter.clone(templateDir);

    spinner.succeed('Download complete!');

    spinner.text = 'Installing dependencies...';

    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

    const install = spawn( pkgManager , ['install'], {
      cwd: targetDir,
      stdio: 'inherit',
      // shell: true,
    });

    install.stdout?.on('data', (data) => {
      spinner.text = `Installing: ${data.toString().trim()}`;
    });

    install.stderr?.on('data', (data) => {
      spinner.text = `Error: ${data.toString().trim()}`;
    });

    install.on('close', (code) => {
      if (code === 0) {
        spinner.succeed('Dependencies installed successfully!');
        const cdProjectName = path.relative(cwd, root);
        console.log(`\nDone. Now run:\n`);
        if (root !== cwd) {
          console.log(
            green(
              `cd ${
                cdProjectName.includes(' ')
                  ? `"${cdProjectName}"`
                  : cdProjectName
              }`,
            ),
          );
        }

        switch (pkgManager) {
          case 'yarn':
          case 'pnpm':
            console.log(green(`${pkgManager} dev\n`));
            break;
          default:
            console.log(green(`${pkgManager} run dev\n`));
        }

        process.exit(0);
      } else {
        spinner.fail(`Failed to install dependencies (exit code: ${code})`);
        process.exit(1);
      }
    });
  } catch (error: any) {
    spinner.fail(`Error occurred: ${error.message}`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(red('An error occurred:'), e);
  process.exit(1);
});
