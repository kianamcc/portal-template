export type Portal = "template";

type RouteButtonsLinks = { buttons: string[]; links: string[] };
type RouteConfig = Record<Portal, RouteButtonsLinks>;

// lists each Portal's navigation buttons and links
const routesConfig: RouteConfig = {
  template: {
    buttons: ["Explore", "Sign In"],
    links: ["Home"],
  },
};

export default routesConfig;
