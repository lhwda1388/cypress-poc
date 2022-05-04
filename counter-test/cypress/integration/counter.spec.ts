// - [o] counter의 초기값은 0이다.
// - [o]  + 버튼을 클릭 시 count가 1증가한다.
// - [o]  - 버튼을 클릭 시 count가 1감소한다.
// - [o]  + 버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다. (Max 값이 10)
// - [o]  - 버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다. (Min 값이 0)
// - [o]  reset 버튼을 클릭 시 counter가 0으로 초기화된다.
describe("test counter app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("초기값은 0", () => {
    cy.get("#value").invoke("text").should("eq", "0");
  });

  it("+버튼 클릭시 1증가", () => {
    cy.get("#value")
      .invoke("text")
      .then((value) => {
        const preValue = Number(value);
        cy.get(".increase-btn").click();
        cy.get("#value")
          .invoke("text")
          .should("eq", String(preValue + 1));
      });
  });

  it("-버튼 클릭시 1감소", () => {
    cy.get(".increase-btn").click();
    cy.get("#value").invoke("text").should("eq", "1");
    cy.get("#value")
      .invoke("text")
      .then((value) => {
        const preValue = Number(value);
        cy.get(".decrease-btn").click();
        cy.get("#value")
          .invoke("text")
          .should("eq", String(preValue - 1));
      });
  });

  it("+버튼 클릭시 count가 10이 넘는경우 더이상 증가히자 않음(max 10)", () => {
    for (let i = 1; i <= 11; i++) {
      cy.get(".increase-btn").click();
    }
    cy.get("#value").invoke("text").should("eq", "10");
  });

  it("-버튼 클릭시 count가 0이 이하로 내려가지 않음(min 10)", () => {
    cy.get(".decrease-btn").click();
    cy.get("#value").invoke("text").should("eq", "0");
  });

  it("reset 버튼 클릭시 0으로 초기화", () => {
    cy.get(".increase-btn").click();
    cy.get(".reset-btn").click();
    cy.get("#value").invoke("text").should("eq", "0");
  });
});
