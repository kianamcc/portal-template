import { GenericRoute } from "portal-base/types/portal-config";

import routeControlWrapperProps from "./routeControlWrapperProps";
import { datasetsDetailsPage } from "./synapseConfigs/datasets";

/**
 * This file defines the routing configuration for the application.
 *
 * - The `routes` array specifies different routes and their settings:
 *   - Each route has a `path`, which determines the URL structure.
 *   - `synapseConfigArray` contains configuration for components displayed on each route.
 *   - Nested routes are used for more specific paths and components.
 *
 * Example:
 * - The root path ("/") displays the "Goals" and "Markdown" sections.
 * - The "Explore" path includes nested routes like "Datasets" and "Files".
 */

const routes: GenericRoute[] = [
  {
    path: "",
    exact: true,
    synapseConfigArray: [
      {
        name: "Goals",
        title: "Our Data",
        centerTitle: true,
        outsideContainerClassName: "home-spacer",
        props: {
          entityId: "syn61670107",
        },
      },
      {
        name: "Markdown",
        title: "Related Resources",
        centerTitle: true,
        props: {
          ownerId: "syn60582629",
          wikiId: "629348",
          loadingSkeletonRowCount: 10,
        },
      },
    ],
  },
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
      {
        path: "Contributors",
        hideRouteFromNavbar: false,
      },
    ],
  },
  {
    path: "OldApply",
    hideRouteFromNavbar: true,
    routes: [
      {
        path: "",
        exact: true,
        hideRouteFromNavbar: true,
        synapseConfigArray: [
          {
            name: "Markdown",
            props: {
              ownerId: "syn60582629",
              wikiId: "629468",
            },
          },
          {
            name: "SynapseFormSubmissionGrid",
            props: {
              pathpart: "/Apply/FormSubmission",
              formGroupId: "61",
              itemNoun: "Submission",
              formClass: "apply-form",
            },
          },
        ],
      },
      {
        exact: true,
        hideRouteFromNavbar: true,
        path: "FormSubmission",
        synapseConfigArray: [
          {
            name: "SynapseFormWrapper",
            props: {
              fileNamePath: "name.submission_name",
              formSchemaEntityId: "syn62691891",
              formUiSchemaEntityId: "syn62691901",
              formNavSchemaEntityId: "syn62691881",
              formTitle: "Project Submission",
              formClass: "apply-form",
            },
          },
        ],
      },
    ],
  },
  {
    path: "Apply",
    exact: true,
    hideRouteFromNavbar: false,
    synapseConfigArray: [
      {
        name: "DynamicForm",
        props: {
          schemaUrl:
            "https://raw.githubusercontent.com/kianamcc/portal-template/main/schemas/form.json",
          uiSchemaUrl:
            "https://raw.githubusercontent.com/kianamcc/portal-template/main/schemas/formUi.json",
          postUrl: "https://submit-form.com/1mGwgZpqX",
        },
        isOutsideContainer: false,
      },
    ],
  },
];

export default routes;
