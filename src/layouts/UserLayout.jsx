import { Outlet } from "react-router-dom";
import Nev from "../component/Nev";

function UserLayout() {
  return (
    <>
      <Nev />
      <Outlet />
    </>
  );
}

export default UserLayout;
