import Total from "./Total";
import Digits, { DigitsType } from "./Digits";
import Modifiers, { ModifierType } from "./Modifiers";
import { caculate } from "../math";
import Operations, { OperationsType } from "./Operations";

export interface CaculatorState {
  input: string | null;
  prevType: "digit" | "operation" | null;
  stack: string[];
  total?: number;
}

class Caculator {
  state: CaculatorState;

  subsribes: ((state: CaculatorState) => void)[];
  constructor() {
    this.state = {
      input: null,
      prevType: null,
      stack: [],
    };
    this.subsribes = [];
    this.init();
  }

  init() {
    const total = new Total({
      element: document.querySelector("#total"),
      total: this.state.total,
    });

    new Digits({
      element: document.querySelector(".digits"),
      onClick: (digit: DigitsType) => this.updateDigits(digit),
    });

    new Operations({
      element: document.querySelector(".operations"),
      onClick: (operation: OperationsType) => this.updateOperation(operation),
    });

    new Modifiers({
      element: document.querySelector(".modifiers"),
      onClick: (modifier: ModifierType) => this.updateModifier(modifier),
    });

    this.subsribes.push((state) => total.render(state));
  }

  setState(nextState: CaculatorState) {
    this.state = nextState;
    this.notify(nextState);
  }

  notify(nextState: CaculatorState) {
    this.subsribes.forEach((fn) => fn(nextState));
  }

  validateEditDigit(newInput: string) {
    const maxSize = 3;
    return newInput.length <= maxSize;
  }

  editDigit(digit: DigitsType) {
    const { stack, input } = this.state;
    const newInput = Number(input) ? `${input}${digit}` : `${digit}`;
    if (!this.validateEditDigit(newInput)) {
      alert("최대 입력 숫자는 3자리 수 입니다");
      return;
    }

    this.setState({
      ...this.state,
      input: newInput,
      stack: [...stack.slice(0, stack.length - 1), newInput],
      prevType: "digit",
    });
  }

  addDigit(digit: DigitsType) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: digit,
      stack: [...stack, digit],
      prevType: "digit",
    });
  }

  updateDigits(digit: DigitsType) {
    const { prevType } = this.state;
    if (prevType === "digit") {
      this.editDigit(digit);
      return;
    }

    this.addDigit(digit);
  }

  editOperation(operation: OperationsType) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: operation,
      stack: [...stack.slice(0, stack.length - 1), operation],
      prevType: "operation",
    });
  }

  addOperation(operation: OperationsType) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: operation,
      stack: [...stack, operation],
      prevType: "operation",
    });
  }

  updateOperation(operation: OperationsType) {
    if (operation === "=") {
      this.caculateResult();
      return;
    }

    const { prevType } = this.state;
    if (prevType === "operation") {
      this.editOperation(operation);
      return;
    }

    this.addOperation(operation);
  }

  updateModifier(modifier: ModifierType) {
    if (modifier !== "AC") {
      return;
    }

    this.reset();
  }

  reset() {
    this.setState({
      ...this.state,
      input: null,
      prevType: null,
      stack: [],
    });
  }

  caculateResult() {
    const { stack } = this.state;

    const { current: result } = stack.reduce(
      (acc, cur) => {
        if (!Number(cur)) {
          acc.operation = cur;
          return acc;
        }

        if (!acc.current) {
          acc.current = cur;
          return acc;
        }

        if (acc.operation && acc.current) {
          const { current, operation } = acc;

          let calcFunc: (a: number, b: number) => number;
          switch (operation) {
            case "+":
              calcFunc = caculate.ADD;
              break;
            case "-":
              calcFunc = caculate.SUBTRACT;
              break;
            case "x":
              calcFunc = caculate.MULTIPLY;
              break;
            case "/":
              calcFunc = caculate.DIVIDE;
              break;
            default:
              calcFunc = caculate.DIVIDE;
              break;
          }

          acc.current = calcFunc?.(Number(current), Number(cur)) + "";
        }

        return acc;
      },
      { current: "", operation: "" }
    );

    this.setState({
      ...this.state,
      input: result,
      prevType: null,
      stack: [result],
    });
  }
}

export default Caculator;
