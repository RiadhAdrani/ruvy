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

                return <div class="hometh">Ruvy : {id}</div>;
              },
            },
          ],
        },
      ],
    },
  ],
  {}
);

mountApp({
  hostElement,
  callback: () => {
    const [value, setValue] = setState("text", "world");
    const [length, setLength] = setState("count", value.length);

    setEffect(() => {
      // setValue("hello");
    }, "on-mounted");

    return (
      <div class="home" id="me">
        <div>
          <nav>
            <a href="/">Home</a>
            <a href="/user">User</a>
          </nav>
        </div>
        <input
          value={value}
          onInput={(e) => {
            setValue(e.currentTarget.value);
            setLength(e.currentTarget.value.length);
          }}
        />
        <h1>
          {value} : {length}
        </h1>
        <Outlet />
      </div>
    );
  },
});
