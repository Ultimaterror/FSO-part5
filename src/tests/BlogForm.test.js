import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm />", () => {
  // let container;
  // beforeEach(() => {
  //   container = render(<BlogForm createBlog={createBlog} />).container;
  // });

  test("Updates parent state and calls onSubmit", async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector('#titleInput')
    const authorInput = container.querySelector('#authorInput')
    const urlInput = container.querySelector('#urlInput')
    const sendButton = screen.getByText("Create");

    await user.type(titleInput, "Testing a form...");
    await user.type(authorInput, "Testor");
    await user.type(urlInput, "test.com");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Testing a form...");
    expect(createBlog.mock.calls[0][0].author).toBe("Testor");
    expect(createBlog.mock.calls[0][0].url).toBe("test.com");
  });
});
