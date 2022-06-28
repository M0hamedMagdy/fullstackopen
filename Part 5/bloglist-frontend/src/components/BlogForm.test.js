import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const newBlog = jest.fn();

  const component = render(<BlogForm newBlog={newBlog} />);

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "Go To Statement Considered Harmful" },
  });
  fireEvent.submit(form);

  expect(newBlog.mock.calls).toHaveLength(1);
  expect(newBlog.mock.calls[0][0].title).toBe(
    "Go To Statement Considered Harmful"
  );
});
