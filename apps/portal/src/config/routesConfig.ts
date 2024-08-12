import { GenericRoute } from "portals-base/types/portal-config";

import routeControlWrapperProps from "./routeControlWrapperProps";
import { datasetsDetailsPage } from "./synapseConfigs/datasets";

const routes: GenericRoute[] = [
  {
    path: "Explore",
    routes: [
      {
        path: ":slug/",
        hideRouteFromNavbar: true,
        exact: true,
        synapseConfigArray: [
          {
            name: "RouteControlWrapper",
            isOutsideContainer: true,
            props: routeControlWrapperProps,
          },
        ],
      },
      {
        path: "Datasets",
        hideRouteFromNavbar: false,
        routes: [
          {
            path: "DetailsPage",
            exact: true,
            synapseConfigArray: datasetsDetailsPage,
          },
        ],
      },
      {
        path: "Files",
        hideRouteFromNavbar: false,
      },
      {
        path: "Publications",
        hideRouteFromNavbar: false,
      },
    ],
  },
];

export default routes;
