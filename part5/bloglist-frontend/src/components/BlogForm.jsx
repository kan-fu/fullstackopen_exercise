import React, { useState } from "react";

const BlogForm = ({ createBlog, setMessage }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setMessage({
      message: `a new blog ${newTitle} by ${newAuthor}`,
      type: "success",
    });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='title'>title</label>

        <input
          value={newTitle}
          id='title'
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='author'>author</label>
        <input
          id='author'
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          type='text'
        />
      </div>
      <div>
        <label htmlFor='url'>url</label>
        <input
          id='url'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          type='text'
        />
      </div>
      <button type='submit'>save</button>
    </form>
  );
};

export default BlogForm;
