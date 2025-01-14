import spawn from 'cross-spawn';
import degit from 'degit';
import minimist from 'minimist';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import colors from 'picocolors';
import prompts from 'prompts';
import { FRAMEWORKS, HELP_MESSAGE, TEMPLATES } from './constants';
import { Framework } from './types';
import { formatDir, isEmpty, pkgFromUserAgent, removeDir } from './utils';

const { blue, red, green, reset } = colors;

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
    'projectName' | 'overwrite' | 'template' | 'framework'
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
            argvTemplate && TEMPLATES.includes(argvTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argvTemplate === 'string' &&
            !TEMPLATES.includes(argvTemplate)
              ? reset(
                  `"${argvTemplate}" isn't a valid template. Please choose from below: `,
                )
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            return {
              title: blue(framework.display || framework.name),
              value: framework,
            };
          }),
        },
        {
          type: (framework: Framework | /* package name */ string) =>
            typeof framework === 'object' ? 'select' : null,
          name: 'template',
          message: reset('Select a template:'),
          choices: (framework: Framework) =>
            framework.templates.map((template) => {
              return {
                title: blue(template.display || template.name),
                value: template.name,
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

  const templateName = template || argvTemplate;

  const repo =
    'https://github.com/runowjs/templates/' + templateName.replace('-', '/'); // react-ts => react/ts

  const spinner = ora(
    `Cloning ${templateName} template into ${templateDir}...`,
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
