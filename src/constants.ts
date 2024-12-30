import { Framework, Template } from './types';

export const HELP_MESSAGE = `\
Usage: create-runow [OPTION]... [DIRECTORY]

Create a new Runow project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
`;

export const FRAMEWORKS: Framework[] = [
  {
    name: 'vanilla',
    display: 'Vanilla',
  },
  {
    name: 'react',
    display: 'React',
  },
  {
    name: 'vue',
    display: 'Vue',
  },
  {
    name: 'angular',
    display: 'Angular',
  },
  {
    name: 'solid',
    display: 'Solid',
  },
  {
    name: 'svelte',
    display: 'Svelte',
  },
];

export const TEMPLATES: Template[] = [
  {
    name: 'react-ts',
    display: 'React + TypeScript',
    framework: 'react'
  }
];
