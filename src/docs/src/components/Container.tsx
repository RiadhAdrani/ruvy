export default ({ children = [], classes = "" }: { children?: unknown; classes?: string }) => {
  return <div class={["col w-100vw p-x-5", classes]}>{children}</div>;
};
