import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import { act } from 'react-dom/test-utils';

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  const setMessage = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} setMessage={setMessage} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.change(author, {
    target: { value: "kan" },
  });
  fireEvent.change(url, {
    target: { value: "foo.html" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
});
