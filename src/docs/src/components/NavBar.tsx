// @ts-ignore
import logo from "../assets/logo.svg";
import Container from "./Container.js";

export default () => {
  const links = [
    { label: "GitHub", link: "https://github.com/RiadhAdrani/ruvy" },
    { label: "NPM", link: "https://www.npmjs.com/" },
  ];

  const pages = [
    { label: "Reference", to: "/reference" },
    { label: "About", to: "/about" },
  ];

  return (
    <Container classes="border-b-solid border-b p-x-5! border-[color:var(--dividerDark2)] h-60px sticky inset-t-0px bg-[color:var(--black)]">
      <nav class="row items-center p-y-3">
        <div class="row flex-1 items-center">
          <a href="/" class="inline-flex gap-2 items-center font-normal">
            <img src={logo} height={30} />
            <p>Ruvy</p>
          </a>
        </div>
        <div class="flex-[2] row">
          <input
            class="flex-1 p-x-4 p-y-2 rounded bg-transparent border border-solid border-[color:var(--grayDark3)] focus:outline-1 focus:outline-solid focus:outline-[color:var(--grayDark1)]"
            placeholder="Search"
          />
        </div>
        <div class="row-center justify-end gap-4 flex-1">
          {pages.map((item) => (
            <a href={item.to}>{item.label}</a>
          ))}
          {links.map((item) => (
            <a href={item.link} target="_blank">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </Container>
  );
};
