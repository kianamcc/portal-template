declare namespace JSX {
  interface IntrinsicElements {
    "custom-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    "smart-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      label?: string;
      onClick?: (event: MouseEvent) => void;
    };
  }
}
