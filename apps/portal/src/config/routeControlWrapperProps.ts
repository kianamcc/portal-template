import { RouteControlWrapperProps } from "portals-base/components/RouteControlWrapper";
import { datasets, files, publications, contributions } from "./synapseConfigs";

const routeControlWrapperProps: RouteControlWrapperProps = {
  customRoutes: [
    { path: "Datasets", synapseConfigArray: [datasets] },
    { path: "Files", synapseConfigArray: [files] },
    { path: "Publications", synapseConfigArray: [publications] },
    { path: "Contributors", synapseConfigArray: [contributions] },
  ],
};
export default routeControlWrapperProps;
