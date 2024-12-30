export type Framework = {
  name: string;
  display: string;
};

export type Template = {
  name: string;
  display: string;
  framework: Framework['name'];
}