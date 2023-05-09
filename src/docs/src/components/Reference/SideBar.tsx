export default () => {
  const sections = [
    {
      title: "Introduction",
      to: "/intro",
      items: [
        { title: "Overview", to: "/overview" },
        { title: "Get Started", to: "/get-started" },
        { title: "Tic Tac Toe", to: "/tic-tac-toe" },
      ],
    },
    {
      title: "Components",
      to: "/components",
      items: [
        { title: "Overview", to: "/overview" },
        { title: "Props", to: "/props" },
        { title: "Events", to: "/events" },
      ],
    },
    {
      title: "Hooks",
      to: "/hooks",
      items: [
        { title: "useState", to: "/use-state" },
        { title: "useEffect", to: "/use-effect" },
        { title: "useMemo", to: "/use-memo" },
        { title: "useRef", to: "/use-ref" },
      ],
    },
    {
      title: "Router",
      to: "/router",
      items: [
        { title: "Setup", to: "/setup" },
        { title: "Navigation", to: "/navigation" },
      ],
    },
  ];

  return (
    <nav
      class="w-320px col overflow-hidden fixed border-1px border-r-solid border-[color:var(--dividerDark2)]"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div class="col h-100% overflow-y-auto p-1">
        <div h="100vh" p-y="5">
          {sections.map((section) => (
            <secion class="col m-b-4 gap-2">
              <h4>{section.title}</h4>
              <div class="col gap-1">
                {section.items.map((item) => (
                  <a
                    href={`/reference${section.to}${item.to}`}
                    class="p-1 p-x-2 hover:bg-[color:var(--textDark4)] rounded"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </secion>
          ))}
        </div>
      </div>
    </nav>
  );
};
