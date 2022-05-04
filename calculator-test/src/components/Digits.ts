import { BaseComponent } from "./BaseComponent";

export type DigitsType =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

class Digits extends BaseComponent {
  constructor(props: {
    element: HTMLElement | null;
    onClick: (digit: DigitsType) => void;
  }) {
    super({
      ...props,
      targetClassName: "digit",
    });
  }
}

export default Digits;
