const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  return response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (body.url === undefined && body.title === undefined) {
    return response.status(400).end();
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  // Also update blog property of the user model
  await user.updateOne({ blogs: [...user.blogs, savedBlog._id] }).exec();

  return response.json(savedBlog.toJSON());
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id);
    if (blogToDelete.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ error: "only user who added the blog can delete it" });
    }
    blogToDelete.remove();
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  // const updatedBlog = {

  // }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
