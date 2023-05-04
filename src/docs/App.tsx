import { Outlet } from "../index.js";
import NavBar from "./src/components/NavBar.js";

export default () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <footer></footer>
    </>
  );
};
