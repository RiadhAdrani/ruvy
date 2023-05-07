import { Outlet } from "../../../index.js";
import Container from "../components/Container.js";
import SideBar from "../components/Reference/SideBar.js";

export default () => {
  return (
    <Container classes="row w-100%!">
      <SideBar />
      <main class="flex-1 m-l-320px xl:m-r-320px p-x-20 p-y-5">
        <Outlet />
      </main>
    </Container>
  );
};
