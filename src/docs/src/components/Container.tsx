export default ({ children = [], classes = "" }: { children?: unknown; classes?: string }) => {
  return <div class={["col w-100% p-x-5", classes]}>{children}</div>;
};
