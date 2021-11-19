const _ = require("lodash");

const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogs) => {
  return !blogs?.length ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs?.length) {
    return {};
  }
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const blogCounts = _.chain(blogs)
    .groupBy("author")
    .mapValues("length")
    .value();
  const maxCount = _.chain(blogCounts).map().max().value();
  const mostBlogsAuthor = _.findKey(blogCounts, (count) => count === maxCount);
  return {
    author: mostBlogsAuthor,
    blogs: maxCount,
  };
};

const mostLikes = (blogs) => {
  const blogLikes = _.chain(blogs)
    .groupBy("author")
    .mapValues((blogs) => _.sumBy(blogs, (blog) => blog.likes))
    .value();
  const maxLikes = _.chain(blogLikes).map().max().value();
  const mostBlogsAuthor = _.findKey(blogLikes, (count) => count === maxLikes);
  return {
    author: mostBlogsAuthor,
    likes: maxLikes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
