import { BaseComponent } from "./BaseComponent";

export type ModifierType = "AC";

class Modifiers extends BaseComponent {
  constructor(props: {
    element: HTMLElement | null;
    onClick: (modifier: ModifierType) => void;
  }) {
    super({
      ...props,
      targetClassName: "modifier",
    });
  }
}

export default Modifiers;
