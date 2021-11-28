describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      username: "kan",
      name: "kan fu",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/api/users", user1);
    const user2 = {
      username: "snow",
      name: "snow ma",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("kan");
      cy.get("#password").type("123456");
      cy.contains("login").click();

      cy.contains("kan logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("kan");
      cy.get("#password").type("wrong");
      cy.contains("login").click();

      cy.get(".message")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "kan logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kan", password: "123456" });
    });

    it("a new note can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a note created by cypress");
      cy.get("#author").type("kan");
      cy.get("#url").type("foo.html");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("several notes exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first note",
          author: "kan",
          url: "foo1.html",
          likes: 15,
        });
        cy.createBlog({
          title: "second note",
          author: "kan",
          url: "foo1.html",
          likes: 30,
        });
        cy.createBlog({
          title: "third note",
          author: "kan",
          url: "foo1.html",
          likes: 9,
        });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").parent().find(".viewButton").click();
        cy.contains("second note")
          .parent()
          .find("p>.likeButton")
          .as("likeButton");
        cy.get("@likeButton").click();
        cy.get("@likeButton").should("contain", "liked");
      });

      it("one of those can be deleted", function () {
        cy.contains("second note").parent().find(".viewButton").click();
        cy.contains("second note")
          .parent()
          .find(".deleteButton")
          .as("deleteButton");
        cy.get("@deleteButton").click();
        cy.on("window:confirm", () => true);
        cy.get("html").should("not.contain", "second note");
      });

      it("only creator can delete the blog", function () {
        cy.contains("logout").click();
        cy.login({ username: "snow", password: "123456" });
        cy.contains("second note").parent().find(".viewButton").click();
        cy.contains("second note").parent().should("not.contain", "delete");
      });

      it("blogs are sorted by the likes", function () {
        cy.get(".viewButton").then((viewButton) => viewButton.click());
        cy.get(".likesCount").then((likes) => {
          likes.map((i, like) => {
            if (i < likes.length - 1) {
              cy.wrap(Number(like.innerText)).should(
                "be.gt",
                Number(likes[i + 1].innerText)
              );
            }
          });
        });
      });
    });
  });
});
