import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  let container;
  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();
  const blog = {
    title: "Spider-man",
    author: "Peter Parker",
    url: "times.com",
    likes: 412365497987987,
    user: {
      username: "BBBB",
      name: "BBBB",
      id: "65522e4e37a3c479598cba78",
    },
    id: "65522e8a37a3c479598cba7e",
  };
  const connectedUser = {
    name: "BBBB",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJCQkIiLCJpZCI6IjY1NTIyZTRlMzdhM2M0Nzk1OThjYmE3OCIsImlhdCI6MTcwMDAzNjY2MX0.laicCdPzXkVLDtpofn43Ze0wU83N8lW8-2itPNfMfwA",
    username: "BBBB",
  };

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={connectedUser}
      />
    ).container;
  });

  test("At start full info is hidden", () => {
    const div = container.querySelector(".blogInfo");
    expect(div).toBeNull();
  });

  test("After clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);
    const div = container.querySelector(".blogInfo");
    expect(div).toBeDefined();
  });

  test("Clicking the button likes 2 times", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const likeButton = container.querySelector(".buttonLike");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
