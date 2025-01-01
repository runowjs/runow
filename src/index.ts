#!/usr/bin/env node

import degit from 'degit';
import minimist from 'minimist';
import * as fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import colors, { reset } from 'picocolors';
import prompts from 'prompts';
import { FRAMEWORKS, HELP_MESSAGE, TEMPLATES } from './constants';
import { Framework } from './types';
import { formatDir, isEmpty, removeDir } from './utils';

const { blue, red, green } = colors;

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

const defaultDir = 'runow-project ';

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
            argvTemplate && TEMPLATES.some((t) => t.name === argvTemplate)
              ? null
              : 'select',
          name: 'framework',
          message:
            typeof argvTemplate === 'string' &&
            !TEMPLATES.some((t) => t.name === argvTemplate)
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
            TEMPLATES.filter((f) => f.framework === framework.name).map(
              (template) => {
                return {
                  title: blue(template.display || template.name),
                  value: template.name,
                };
              },
            ),
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

  if (overwrite === 'yes') {
    removeDir(root);
  }

  const templateName = template || argvTemplate;

  const repo =
    'https://github.com/runowjs/templates/main/tree/' + templateName.replace('-', '/'); // react-ts => react/ts


  const spinner = ora(
    `Starting downloading ${templateName} template...`,
  ).start();

  const emitter = degit(repo, {
    cache: false,
    force: true,
    verbose: true,
    mode: 'git',
  });

  emitter.on('info', (info) => {
    spinner.text = info.message;
  });

  try {
    await emitter.clone(root);
    spinner.succeed('Download complete!');
    console.log(green(`Project path: ${root}`));
    process.exit(0);
  } catch (error: any) {
    spinner.fail('Download failed!');

    const msg = error.message;

    if (msg.includes('ENOTFOUND')) {
      console.log(
        red('Network error:') +
          ' Unable to reach the server. Check your internet connection.',
      );
    } else if (msg.includes('404')) {
      console.log(
        red('Repository not found:') +
          ' Verify the repository URL and try again.',
      );
    } else if (msg.includes('403')) {
      console.log(
        red('Access denied:') +
          ' You might not have permission to access this repository.',
      );
    } else {
      console.error(red('✖') + ` An unexpected error occurred: ${msg}`);
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(red('An error occurred:'), e);
  process.exit(1);
});
