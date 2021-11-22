import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage({ message: "wrong username or password", type: "warning" });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => -a.likes + b.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (obj) => {
    const newBlog = await blogService.create(obj);
    setBlogs([...blogs, newBlog]);
    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = async (obj) => {
    const returnedBlog = await blogService.update(obj);
    setBlogs(
      blogs
        .map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
        .sort((a, b) => -a.likes + b.likes)
    );
  };

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id);
    setBlogs(
      blogs.filter((blog) => blog.id !== id).sort((a, b) => -a.likes + b.likes)
    );
  };

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={message} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  }
  return (
    <>
      <h2>blogs</h2>
      <Notification message={message} />
      {user !== null && (
        <>
          <p>
            {user.username} logged in
            <button type='submit' onClick={handleLogout}>
              logout
            </button>
          </p>
        </>
      )}
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} setMessage={setMessage} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          username={user.username}
        />
      ))}
    </>
  );
};

export default App;
