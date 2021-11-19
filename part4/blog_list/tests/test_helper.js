const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "hi",
    author: "Kan",
    url: "foo.html",
    likes: 500,
  },
  {
    title: "hello",
    author: "snow",
    url: "bar.html",
    likes: 499,
  },
];

const initialUsers = [
  {
    username: "kan",
    name: "kan fu",
    password: "12345",
  },
  {
    username: "snow",
    name: "snow ma",
    password: "12345",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovesoon",
    author: "willremovesoon",
    url: "willremovesoon",
    likes: 500,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
};
