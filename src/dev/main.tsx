import {
  Outlet,
  createRouter,
  mountApp,
  useId,
  createContext,
  useState,
  useReactive,
} from "../index.js";

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

const ThemeContext = createContext<{ theme: boolean; toggleTheme: () => void }>({
  theme: false,
  toggleTheme: () => undefined,
});

const ThemeProvider = ({ on = false, children }: { on: boolean; children?: Array<unknown> }) => {
  const [theme, set] = useState(on);

  const toggleTheme = () => set(!theme);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const Buttons = () => {
  const text = useReactive({ value: "" });

  return <input value={text.value} onInput={e => (text.value = e.currentTarget.value)} />;
};

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
      <ThemeProvider on>
        <Buttons />
      </ThemeProvider>
      <ThemeProvider on={false}>
        <Buttons />
      </ThemeProvider>
      <Outlet />
    </>
  );
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
