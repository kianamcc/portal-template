import { RouteControlWrapperProps } from "portals-base/components/RouteControlWrapper";
import { datasets, files, publications } from "./synapseConfigs";

const routeControlWrapperProps: RouteControlWrapperProps = {
  customRoutes: [
    { path: "Datasets", synapseConfigArray: [datasets] },
    { path: "Files", synapseConfigArray: [files] },
    { path: "Publications", synapseConfigArray: [publications] },
  ],
};
export default routeControlWrapperProps;
