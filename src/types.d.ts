declare namespace JSX {
  interface IntrinsicElements {
    "community-list": { data?: any; class?: string; [key: string]: any };
    "mock-ui-kit": { class?: string; [key: string]: any };
    "ui-button": {
      variant?: string;
      size?: string;
      fullWidth?: boolean;
      disabled?: boolean;
      href?: string;
      type?: string;
      class?: string;
      [key: string]: any;
    };
  }
}
