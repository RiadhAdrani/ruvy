declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare module 'marked-mangle' {
  export function mangle(): any;
}
