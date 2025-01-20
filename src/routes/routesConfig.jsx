import React from "react";
const HomePage = React.lazy(() => import("../pages/Home"));

const routesConfig = {
  public: [{ path: "/", element: HomePage }],
};

export default routesConfig;
