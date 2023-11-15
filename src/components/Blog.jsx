import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visibility, setVisibility] = useState(false);

  async function handleUpdate() {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  }

  function handleDelete() {
    if (confirm("Delete ?")) {
      deleteBlog(blog.id);
    }
  }

  let isOwner = blog.user.username === user.username;

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogTitle">
        {blog.title} - {blog.author}{" "}
        <button className="buttonHideView" onClick={() => setVisibility(!visibility)}>
          {visibility ? "Hide" : "View"}{" "}
        </button>
      </div>
      {visibility && (
        <div className="blogInfo">
          <a href={blog.url}>{blog.url} </a>
          <p>
            {blog.likes} likes <button className="buttonLike" onClick={handleUpdate}>Like</button>{" "}
          </p>
          <p>{blog.user.name} </p>
          {isOwner && <button className="buttonDelete" onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
