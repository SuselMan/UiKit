declare module *.module.css {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module *.svg?react {
  import * as React from react;
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module *.svg {
  const src: string;
  export default src;
}
