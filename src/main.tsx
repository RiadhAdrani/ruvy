import { mountApp, createJsxElement, navigate, Outlet, createRouter, getParams } from "./core";

const hostElement = document.getElementById("app")!;

declare global {
  namespace JSX {
    type IntrinsicElements = Record<string, Record<string, unknown>>;
  }
}

createRouter(
  [
    {
      path: "/",
      object: () => "Hello",
      routes: [
        { path: "home", object: () => <div class="HomeSweetHome">Home Sweet Home</div> },
        {
          path: "/user",
          object: () => {
            return (
              <div>
                <Outlet />
              </div>
            );
          },
          routes: [
            {
              path: "/:id",
              object: () => {
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
    return (
      <div class="home" id="me">
        <nav style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Root
        </nav>
        <nav onClick={() => navigate("/home")}>Home</nav>
        <Outlet />
      </div>
    );
  },
});
