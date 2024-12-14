#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';

async function run() {
  console.log(chalk.green.bold('Welcome to runow CLI!'));

  const { framework } = await inquirer.prompt<{ framework: string }>([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose a framework',
      choices: ['React', 'Vue', 'Angular', 'Solid', 'Svelte'],
    },
  ]);

  switch (framework) {
    case 'React':
      console.log(chalk.blue`creating a react app`);
      break;

    default:
      console.log(chalk.red('Invalid selection'));
      process.exit(0);
  }
}

run().catch((e) => {
  console.error(chalk.red('An error occurred:'), e);
  process.exit(1);
});
