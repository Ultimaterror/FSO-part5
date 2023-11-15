import React from "react";
import { useState } from "react";

const initialBlog = {
  title: "",
  author: "",
  url: "",
};
export default function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState(initialBlog);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog(initialBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New blog</h3>
      <div>
        title
        <input
          id="titleInput"
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        author
        <input
          id="authorInput"
          type="author"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        url
        <input
          id="urlInput"
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button id="blogSubmit" type="submit">Create</button>
    </form>
  );
}
