export type UiType = {
  display: string;
  names: string[];
  path: string
}

export type FrameworkType = {
  display: string;
  items: UiType[]
}

export type StackType = {
  display: string;
  items: FrameworkType[];
  color: (str: string | number) => string
}