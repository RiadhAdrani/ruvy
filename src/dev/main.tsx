import { Outlet, createRouter, mountApp, useId } from "../index.js";

createRouter(
  [
    {
      component: <div>Home</div>,
      path: "/",
    },
    {
      component: <div>You</div>,
      path: "/you",
    },
  ],
  {}
);

const App = () => {
  const links = [
    { to: "/", lable: "Home" },
    { to: "/you", lable: "Youtube" },
  ];

  const id = useId();

  return (
    <>
      <nav>
        {links.map(item => (
          <a
            class:pending-action={false}
            class={id}
            href={item.to}
            style={{ padding: ["10px", "5px"] }}
          >
            {item.lable}
          </a>
        ))}
      </nav>
      <Outlet />
    </>
  );
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
