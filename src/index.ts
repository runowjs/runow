#!/usr/bin/env node

import minimist from 'minimist';
import * as fs from 'node:fs';
import path from 'node:path';
import colors, { reset } from 'picocolors';
import prompts from 'prompts';
import { FRAMEWORKS, HELP_MESSAGE, TEMPLATES } from './constants';
import { Framework } from './types';
import { formatDir, isEmpty } from './utils';

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

  const getProjectName = () => path.basename(path.resolve(targetDir));

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
          name: 'packageName',
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
            {
              title: 'Ignore files and continue',
              value: 'ignore',
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
          choices: (framework: Framework) => [],
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (e) {
    console.log(e);
    return;
  }

  const { framework, overwrite, template } = result;

  console.log(framework, overwrite, template);
}

run().catch((e) => {
  console.error(red('An error occurred:'), e);
  process.exit(1);
});
