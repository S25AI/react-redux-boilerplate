import { News } from "./pages/News";
import { NewsCategory } from "./pages/NewsCategory";
import { Home } from "./pages/Home";
import { Root } from "./pages/Root";

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/news",
        exact: true,
        component: News
      },
      {
        path: "/news/:id",
        component: NewsCategory
      }
    ]
  }
];

export default routes;
