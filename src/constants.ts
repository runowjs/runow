import { Framework } from "./types";

export const HELP_MESSAGE = `\
Usage: create-runow [OPTION]... [DIRECTORY]

Create a new Runow project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
`;

export const FRAMEWORKS: Framework[] = [
  {
    name: "vanilla",
    display: "Vanilla",
    templates: [],
  },
  {
    name: "react",
    display: "React",
    templates: [
      {
        name: "react-ts",
        display: "React + TypeScript",
      },
      {
        name: "react-antd",
        display: "React + Antd",
      },
      {
        name: "react-nextjs-nextui",
        display: "React + Next.js + NextUI",
      },
      {
        name: "react-nextjs-headlessui",
        display: "React + Next.js + HeadlessUI",
      },
    ],
  },
  {
    name: "vue",
    display: "Vue",
    templates: [],
  },
  {
    name: "angular",
    display: "Angular",
    templates: [],
  },
  {
    name: "solid",
    display: "Solid",
    templates: [],
  },
  {
    name: "svelte",
    display: "Svelte",
    templates: [],
  },
];

export const TEMPLATES: string[] = FRAMEWORKS.map((f) =>
  f.templates.map((t) => t.name),
).reduce((a, b) => a.concat(b));
