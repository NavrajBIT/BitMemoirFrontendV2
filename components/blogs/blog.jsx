import BlogCard from "./blogCard";
import BlogFullCard from "./blogFullCard";
import useblog from "./useblog";

const Blog = async () => {
  const { blogs } = await useblog();
  console.log(blogs);

  const smallBlogs = blogs.slice(0, 5);
  const largeBlogs = blogs.slice(5, blogs.length + 1);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        minHeight: "var(--min-height-screen)",
        margin: "auto",
        padding: "var(--padding-main)",
        display: "flex",
        gap: "var(--padding-main)",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {smallBlogs.map((blog, index) => {
        return <BlogCard key={"small-blog-" + index} blog={blog} />;
      })}
      {largeBlogs.map((blog, index) => {
        return <BlogFullCard key={"large-blog-" + index} blog={blog} />;
      })}
    </div>
  );
};

export default Blog;
