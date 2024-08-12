import { Portal } from "./routesConfig";

type ExploreTabTypes = {
  table?: string[];
  table_charts?: string[];
  cards?: string[];
  cards_charts?: string[];
  people_charts?: string[];
};

type ExploreConfig = Record<Portal, ExploreTabTypes>;

// lists the objects (cards, charts, table, people) on each Explore tab per Portal
const exploreConfig: ExploreConfig = {
  template: {
    // table: ["Files"], // uncomment when files is public
    cards: ["Datasets"], // add "Publications" when public
  },
};

export default exploreConfig;
