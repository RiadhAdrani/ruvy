import { Outlet } from "../../../index.js";
import Container from "../components/Container.js";
import SideBar from "../components/Reference/SideBar.js";

export default () => {
  return (
    <Container classes="row w-100%!">
      <SideBar />
      <main class="flex-1 m-l-320px max-w-1200px p-x-5 sm:p-x-10 lg:p-x-20 p-y-5 overflow-x-auto">
        <Outlet />
      </main>
    </Container>
  );
};
