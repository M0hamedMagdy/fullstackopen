function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  return blogs.reduce((total, blogI) => total + blogI.likes, 0);
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return {};
  } else {
    return blogs.reduce(
      (mostLikes, blog) => (blog.likes > mostLikes ? blog.likes : mostLikes),
      blogs[0].likes
    );
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
