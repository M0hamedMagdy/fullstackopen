import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component tests", () => {
  let blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();

  test("ecks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
    expect(component.container).toHaveTextContent(
      "React patterns - Michael Chan"
    );
  });

  test("checks that the blog's url and number of likes are shown when the button controlling the shown details has been clicked.", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("https://reactpatterns.com/");

    expect(component.container).toHaveTextContent("7");
  });
});
