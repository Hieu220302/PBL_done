import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import layout_admin from "../layouts/layout_admin/layout_admin";
import Order from "../components/Order/Order";
import Revenue from "../components/Revenue/Revenue";
import layout_login from "../layouts/layout_login/layout_login";
const ARoutes = [
  { path: "/", component: Login, layout: layout_login },
  { path: "/home", component: Home, layout: layout_admin },
  { path: "/order", component: Order, layout: layout_admin },
  { path: "/revenue", component: Revenue, layout: layout_admin },
];

export { ARoutes };
