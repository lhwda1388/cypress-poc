import { BaseComponent } from "./BaseComponent";

export type OperationsType = "+" | "-" | "/" | "x" | "=";

class Operations extends BaseComponent {
  constructor(props: {
    element: HTMLElement | null;
    onClick: (modifier: OperationsType) => void;
  }) {
    super({
      ...props,
      targetClassName: "operation",
    });
  }
}

export default Operations;
