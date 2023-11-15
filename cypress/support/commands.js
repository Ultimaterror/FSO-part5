Cypress.Commands.add("login", (credentials) => {
  cy.request("POST",`${Cypress.env("BACKEND")}/login` , credentials).then(
    ({ body }) => {
      localStorage.setItem("loggedUser", JSON.stringify(body));
      cy.visit("http://localhost:5173");
    }
  );
});

Cypress.Commands.add("createBlog", (data) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:5173");
});
