import blogService from "../services/blogs";
import Blog from "./Blog";
import { useEffect } from "react";

const Blogs = ({ blogs, setBlogs, reload, updateBlog, deleteBlog, user }) => {
  useEffect(() => {
    blogService.getAll().then((data) => setBlogs(data));
  }, [reload]);

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default Blogs;
