import { Outlet } from "../../../index.js";
import Container from "../components/Container.js";
import SideBar from "../components/Reference/SideBar.js";

export default () => {
  return (
    <Container classes="row w-100%!">
      <SideBar />
      <main class="flex-1 m-t-[var(--sideBar-top)] md:m-t-0px md:m-l-[var(--sideBar)] max-w-1200px p-x-0 md:p-x-10 p-y-5 overflow-x-auto">
        <Outlet />
      </main>
    </Container>
  );
};
