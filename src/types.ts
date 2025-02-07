export type UikitType = {
  display: string;
  names: string[];
  path: string
}

export type FrameworkType = {
  display: string;
  items: UikitType[]
}

export type StackType = {
  display: string;
  items: FrameworkType[];
  color: (str: string | number) => string
}