import Home from "./pages/Home";
import { DefaultLayout } from "./layouts/Default";
import Foo from "./pages/Foo";
import Bar from "./pages/Bar";

export const _routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <DefaultLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "foo",
            element: <Foo />,
          },
          {
            path: "bar",
            element: <Bar />,
          },
        ]
      },
    ]
  }
];