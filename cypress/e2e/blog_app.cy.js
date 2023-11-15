describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Alma Koesia",
      username: "Alko",
      password: "DACC",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.get("#login-username");
    cy.get("#login-password");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#login-username").type("Alko");
      cy.get("#login-password").type("DACC");
      cy.get("#login-button").click();

      cy.contains("Alma Koesia logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.get("#login-username").type("AAAA");
      cy.get("#login-password").type("AAAA");
      cy.get("#login-button").click();

      cy.get("#notif")
        .should("contain", "wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Alko", password: "DACC" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#titleInput").type("Testing a form...");
      cy.get("#authorInput").type("Testor");
      cy.get("#urlInput").type("test.com");
      cy.get("#blogSubmit").click();
      cy.contains("Testing a form...");
      cy.contains("Testor");
    });

    describe("and blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Spider-man",
          author: "Peter Parker",
          url: "times.com",
          likes: 15,
        });
        cy.createBlog({
          title: "Lonetrail",
          author: "Arknights",
          url: "arknights.com",
          likes: 11,
        });
        cy.createBlog({
          title: "Spider-man returns",
          author: "Peter Parker",
          url: "times.com",
          likes: 150,
        });
      });

      it("Can like a blog", function () {
        cy.contains("Lonetrail").parent().as("blogDiv");
        cy.get("@blogDiv").find(".buttonHideView").click();
        cy.get("@blogDiv").find(".buttonLike").click();
      });

      it("Can delete a blog", function () {
        cy.contains("Lonetrail").parent().as("blogDiv");
        cy.get("@blogDiv").find(".buttonHideView").click();
        cy.get("@blogDiv").find(".buttonDelete").click();
        cy.contains("Lonetrail").should("not.exist");
      });

      it("Can't delete a blog if you're not the creator", function () {
        cy.contains("Logout").click();
        const user = {
          name: "Ben Ji",
          username: "BigBen",
          password: "Kenji",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.login({ username: "BigBen", password: "Kenji" });
        cy.contains("Lonetrail").parent().as("blogDiv");
        cy.get("@blogDiv").find(".buttonHideView").click();
        cy.get("@blogDiv").find(".buttonDelete").should("not.exist");
      });

      it.only("Ordered by likes", function () {
        cy.get(".blog")
          .eq(0)
          .should("contain", "Spider-man returns");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Spider-man");
        cy.get(".blog")
          .eq(2)
          .should("contain", "Lonetrail");
      });
    });
  });
});
