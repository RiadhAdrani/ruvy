import { useState } from "../../../../index.js";
import Container from "../Container.js";

const sections = [
  {
    title: "Introduction",
    to: "/intro",
    items: [
      { title: "Overview", to: "/overview" },
      { title: "Get Started", to: "/get-started" },
      // { title: "Tic Tac Toe", to: "/tic-tac-toe" },
    ],
  },
  // {
  //   title: "Components",
  //   to: "/components",
  //   items: [
  //     { title: "Overview", to: "/overview" },
  //     { title: "Props", to: "/props" },
  //     { title: "Events", to: "/events" },
  //   ],
  // },
  {
    title: "Hooks",
    to: "/hooks",
    items: [
      { title: "Rules", to: "/rules" },
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
      { title: "Api", to: "/api" },
    ],
  },
];

export default () => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <>
      <nav
        class={[
          !show ? "w-0px border-0px" : "border-1px w-[var(--sideBar)] z-[3]",
          "md:w-[var(--sideBar)]",
          "col bg-[var(--black)] overflow-hidden fixed md:border-1px border-r-solid border-[color:var(--dividerDark2)] duration-200 top-[var(--sideBar-res)] md:top-60px",
        ]}
        style={{ height: "calc(100vh - var(--navBar))" }}
      >
        <div class="col h-100% w-[var(--sideBar)] overflow-y-auto p-1">
          <div h="100vh" p-y="5">
            {sections.map((section) => (
              <secion class="col m-b-4 gap-2">
                <h4>{section.title}</h4>
                <div class="col gap-1">
                  {section.items.map((item) => (
                    <a
                      href={`/reference${section.to}${item.to}`}
                      onClick={() => setShow(false)}
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
      <Container classes="row md:hidden items-center justify-between p-x-2 fixed inset-x-0 p-y-1 h-[var(--sideBar-top)] bg-[var(--black)] inset-t-60px w-100% border-1px border-b-solid border-[color:var(--dividerDark2)]">
        <span class="cursor-pointer" onClick={toggle}>
          Menu
        </span>
        <span
          class="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Return to top
        </span>
      </Container>
      <div
        class={[
          "bloc md:hidden fixed inset-t-[var(--sideBar-res)] w-100% h-100% duration-200",
          show ? "z-[2] bg-[#000000aa]" : "z-[-1] bg-[#00000000]",
        ]}
        onClick={toggle}
      />
    </>
  );
};
