export class BaseComponent {
  protected element: HTMLElement | null;
  protected targetClassName: string;
  constructor({
    element,
    onClick,
    targetClassName,
  }: {
    element: HTMLElement | null;
    onClick: (digit: any) => void;
    targetClassName: "digit" | "operation" | "modifier";
  }) {
    this.element = element;
    this.targetClassName = targetClassName;
    this.bindEvents(onClick);
  }

  bindEvents(onClick: (digit: any) => void) {
    this.element?.addEventListener("click", ({ target }: any) => {
      if (target?.["className"] !== this.targetClassName) {
        return;
      }

      onClick(target.innerText);
    });
  }
}
