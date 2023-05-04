// @ts-ignore
import logo from "../assets/logo.svg";
import Container from "../components/Container.js";

export default () => {
  const buttons = [
    {
      label: "Reference",
      to: "/reference",
    },
    { label: "About", to: "/about" },
  ];

  return (
    <Container classes="col">
      <div class="col-center gap-6 p-b-100px" style={{ height: "calc(100vh - 60px)" }}>
        <img src={logo} height={110} />
        <h1 class="text-[4em] p-2 m-b-4 w-50% text-center border-b border-b-solid border-[color:var(--grayDark3)]">
          Ruvy
        </h1>
        <h2 class="font-400">Another front-end framework</h2>
        <p class="font-400">React-inspired framework to build web user interfaces</p>
        <div class="row gap-4 m-t-2">
          {buttons.map((item, index) => (
            <a href={item.to}>
              <button
                class={[
                  "p-x-8 p-y-3 rounded-20px text-inherit flex-1 cursor-pointer hover:opacity-80",
                  index !== 0
                    ? "bg-[color:transparent] border-1 border-solid border-[color:var(--grayDark3)]"
                    : "border-none bg-[color:var(--red)]",
                ]}
              >
                {item.label}
              </button>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
};
