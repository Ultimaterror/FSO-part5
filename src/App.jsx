import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useRef } from "react";
import blogService from "./services/blogs";

let initialNotif = {
  message: null,
};

const App = () => {
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(initialNotif);
  const [blogs, setBlogs] = useState([]);
  const [reload, setReload] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  }

  async function createBlog(newBlog) {
    try {
      await blogService.create(newBlog);
      setReload(!reload);
      blogFormRef.current.toggleVisibility();
      setNotif({
        message: `Added ${newBlog.title} by ${newBlog.author}`,
        success: true,
      });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 3000);
    } catch (error) {
      setNotif({ message: error.response.data.error });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 5000);
    }
  }

  async function updateBlog(updatedBlog) {
    try {
      const data = {
        title: updatedBlog.title,
        author: updatedBlog.author,
        url: updatedBlog.url,
        likes: updatedBlog.likes,
        userId: updatedBlog.user.id,
      };
      await blogService.update(updatedBlog.id, data);
      setReload(!reload);
    } catch (error) {
      setNotif({
        message: `Error Updating ${error.response.data.error}`,
        success: false,
      });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 3000);
    }
  }

  async function deleteBlog(blogId) {
    try {
      await blogService.deleteOne(blogId);
      setReload(!reload);
      setNotif({ message: "Delete Successful", success: true });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 3000);
    } catch (error) {
      setNotif({ message: "Error Deleting", success: false });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 3000);
    }
  }

  return (
    <div>
      <Notifications notif={notif} />
      <h2>Blogs</h2>
      {user ? (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <br />
          <Blogs
            blogs={blogs}
            setBlogs={setBlogs}
            reload={reload}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        </>
      ) : (
        <LoginForm
          initialNotif={initialNotif}
          setNotif={setNotif}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
