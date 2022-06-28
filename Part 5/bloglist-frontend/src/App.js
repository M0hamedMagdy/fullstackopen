import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  async function getBlogs() {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  }

  // 5.2: bloglist frontend, step2
  // Making the Logging Permenant
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getBlogs();
    }
  }, []);

  // 5.1: bloglist frontend, step1
  // LoginForm Componant, loginService and handleLogin
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      // 5.2: bloglist frontend, step2
      // Making the Logging Permenant
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // 5.3: bloglist frontend, step3
      // Expand your application to allow a logged-in user to add new blogs
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setSuccessMessage("User Logged in");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  // logOut function
  async function logOut(e) {
    e.preventDefault();
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  }

  //5.3: bloglist frontend, step3
  async function newBlog(blogToAdd) {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(blogToAdd);
      setSuccessMessage(`Blog ${blogToAdd.title} was successfully added`);
      setBlogs(blogs.concat(createdBlog));
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Cannot add blog ${blogToAdd.title}`);
      setSuccessMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  }

  async function updateBlog(blogToUpdate) {
    try {
      const updatedBlog = await blogService.update(blogToUpdate);
      setSuccessMessage(`Blog ${blogToUpdate.title} was updated successfully`);
      setBlogs(
        blogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : updatedBlog))
      );
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Cannot update blog ${blogToUpdate.title}`);
      setSuccessMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  }

  async function deleteBlog(blogToDelete) {
    try {
      if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
        blogService.remove(blogToDelete.id);
        setSuccessMessage(
          `Blog ${blogToDelete.title} was successfully deleted`
        );
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        setErrorMessage(null);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage(`Cannot delete blog ${blogToDelete.title}`);
      setSuccessMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  function handlePasswordChange({ target }) {
    setPassword(target.value);
  }
  function handleUserChange({ target }) {
    setUsername(target.value);
  }

  return (
    <>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handleUserChange={handleUserChange}
          />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name} Logged in{" "}
            <button onClick={logOut} type="submit">
              LogOut
            </button>
          </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm newBlog={newBlog} />
          </Togglable>
          {blogs.sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      )}
    </>
  );
};

export default App;
