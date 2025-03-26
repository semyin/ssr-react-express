import Home from "./pages/Home";
import { Outlet } from "react-router";
import Foo from "./pages/Foo";
import Bar from "./pages/Bar";


function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

export const routes = [
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "foo",
        Component: Foo,
      },
      {
        path: "bar",
        Component: Bar,
      },
    ]
  }
]