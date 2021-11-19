const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const promiseArray = helper.initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = new User({ ...user, passwordHash });
    return newUser.save();
  });
  await Promise.all(promiseArray);
}, 100000);

describe("addition of a new blog", () => {
  test("a valid blog with correct token can be added", async () => {
    const response = await api.post("/api/login").send({
      username: "kan",
      password: "12345",
    });
    const token = response.body.token;
    const newBlog = {
      title: "foo",
      author: helper.initialUsers[0].username,
      url: "foobar.html",
      likes: 30,
    };

    // console.log(response);
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("foo");
  });

  test("addition without token will be rejected with 401", async()=>{
    const newBlog = {
      title: "foo",
      author: helper.initialUsers[0].username,
      url: "foobar.html",
      likes: 30,
    };

    // console.log(response);
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
  })
});

afterAll(async () => {
  mongoose.connection.close();
});
