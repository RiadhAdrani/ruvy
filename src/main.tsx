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
    const [volume, setVolume] = setState("volume", 1);

    return (
      <div class="home" id="me">
        <input
          type="range"
          min={0}
          max={100}
          onInput={(e) => {
            setVolume(Number(e.currentTarget.value) / 100);
          }}
        />
        <video width={320} height={200} volume={volume} controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  },
});
