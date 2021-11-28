import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

let component;
let blog;
let mockHandler;

beforeEach(() => {
  blog = {
    title: "Component testing",
    author: "kan",
    url: "foobar.html",
    likes: "99",
    user: {
      username: "foo",
    },
  };
  mockHandler = jest.fn();
  component = render(<Blog blog={blog} updateBlog={mockHandler} />);
});

describe("When view button is not clicked", () => {
  test("Blog only renders title and author", () => {
    expect(component.container).toHaveTextContent("Component testing");
    expect(component.container).toHaveTextContent("kan");
    expect(component.container).not.toHaveTextContent("foobar.html");
    expect(component.container).not.toHaveTextContent("99");
  });
});

describe("When view button is clicked", () => {
  beforeEach(() => {
    const button = component.container.querySelector(".viewButton");
    fireEvent.click(button);
  });

  test("Blog renders url and likes as well", () => {
    expect(component.container).toHaveTextContent("foobar.html");
    expect(component.container).toHaveTextContent("99");
  });

  test("like button clicked twice fires two event handlers", () => {
    const button = component.container.querySelector(".likeButton");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
