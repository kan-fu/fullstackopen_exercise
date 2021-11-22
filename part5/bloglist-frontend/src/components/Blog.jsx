import React, { useState } from "react";
const Blog = ({ blog, updateBlog, username, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "2px solid black",
    margin: 0,
    marginBottom: 5,
  };

  const [view, setView] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!liked) {
      const updatedBlog = { id: blog.id, likes: blog.likes + 1 };
      await updateBlog(updatedBlog);
      setLiked(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id);
    }
  };

  const isAuthorEqualLoggedUser = blog.user.username === username;

  if (view) {
    return (
      <div className='blog' style={blogStyle}>
        <p>
          {blog.title} <button className="hideButton" onClick={() => setView(!view)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes <span className="likesCount">{blog.likes}</span>{" "}
          <button className="likeButton" onClick={handleLike} disabled={liked}>
            {liked ? "liked" : "like"}
          </button>
        </p>
        <p>{blog.author}</p>
        {isAuthorEqualLoggedUser && (
          <button className="deleteButton" onClick={handleDelete}>delete</button>
        )}
      </div>
    );
  }
  return (
    <div className='blog' style={blogStyle}>
      <p>
        {blog.title} {blog.author}{" "}
        <button className="viewButton" onClick={() => setView(!view)}>view</button>
      </p>
    </div>
  );
};

export default Blog;
