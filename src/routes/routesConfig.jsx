import React from "react";
const HomePage = React.lazy(() => import("../pages/Home"));
const WatchMoviePage = React.lazy(() => import("../pages/WatchMovie"));

const routesConfig = {
  public: [
    { path: "/", element: HomePage },
    { path: "/watch/:name", element: WatchMoviePage },
  ],
};

export default routesConfig;
