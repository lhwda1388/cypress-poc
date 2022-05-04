class Total {
  element: any;
  constructor({ element }: any) {
    this.element = element;
  }

  render({ stack }: any) {
    this.element.innerText = stack.length ? stack.join("") : 0;
  }
}

export default Total;
