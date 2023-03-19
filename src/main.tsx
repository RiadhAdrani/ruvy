import { mountApp, Outlet, createRouter, getParams } from "./core";

const hostElement = document.getElementById("app")!;

const Home = () => {
  return <div class={["HomeSweetHome"]}>Home Sweet Home</div>;
};

const User = () => {
  return (
    <div>
      <h1>Home</h1>
      <Outlet />
    </div>
  );
};

createRouter(
  [
    {
      path: "/",
      component: () => <Home />,
      routes: [
        { path: "home", component: Home },
        {
          path: "/user",
          component: User,
          routes: [
            {
              path: "/:id",
              component: () => {
                const { id } = getParams<{ id: string }>();

                return (
                  <div class="hometh">
                    <div>id : {id}</div>
                    <Outlet />
                  </div>
                );
              },
            },
          ],
        },
      ],
    },
  ],
  {}
);

const routes = [
  { title: "Home", to: "/" },
  { title: "User", to: "/user" },
  { title: "Me", to: "/user/me" },
];

mountApp({
  hostElement,
  callback: () => {
    return (
      <div>
        <div>
          {routes.map((item) => (
            <a href={item.to} style={{ padding: ["10px", "20px"] }}>
              <span>{item.title}</span>
            </a>
          ))}
          <input value={1} />
        </div>
        <Outlet />
      </div>
    );
  },
});
