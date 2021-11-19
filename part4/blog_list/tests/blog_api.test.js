const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 100000);

describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the unique identifier property is named id", async () => {
    const res = await api.get("/api/blogs");
    res.body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "foo",
      author: "unknow",
      url: "foobar.html",
      likes: 30,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("foo");
  });

  test("blog without likes will have 0 likes by default", async () => {
    const newBlog = {
      title: "foo",
      author: "unknow",
      url: "foobar.html",
    };
    const res = await api.post("/api/blogs").send(newBlog);
    expect(res.body.likes).toBe(0);
  });

  test("blogs without title and url will have 400 bad request", async () => {
    const newBlog = {
      author: "unknow",
      likes: 9,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogsToDelete)
  })
})

describe("update of a blog", () => {
  test("succeeds with valid data", async ()=> {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToUpdate = {...blogsAtStart[0], likes:999}
    console.log(blogsToUpdate)
    const res= await api.put(`/api/blogs/${blogsToUpdate.id}`).send(blogsToUpdate)
    expect(res.body.likes).toBe(999)
  })
})

afterAll(() => {
  mongoose.connection.close();
});
