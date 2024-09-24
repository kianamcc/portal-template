import { ButtonProps } from "smart-webcomponents-react/button";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      "smart-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ButtonProps;
    }
  }
}
