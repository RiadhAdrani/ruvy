import { Outlet, createRouter, mountApp } from "../index.js";

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

  return (
    <>
      <nav>
        {links.map(item => (
          <a class:pending-action={true} href={item.to} style={{ padding: ["10px", "5px"] }}>
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
