import BlogCard from "./blogCard";
import BlogFullCard from "./blogFullCard";
import useblog from "./useblog";

const Blog = async ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const { blogs } = await useblog();

  let smallBlogs = [];
  let largeBlogs = [];

  try {
    smallBlogs = blogs.slice(0, 5);
    largeBlogs = blogs.slice(5, blogs.length + 1);
  } catch {
    smallBlogs = [];
    largeBlogs = [];
  }

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
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {smallBlogs.map((blog, index) => {
        return <BlogCard key={"small-blog-" + index} blog={blog} ln={ln} />;
      })}
      {largeBlogs.map((blog, index) => {
        return <BlogFullCard key={"large-blog-" + index} blog={blog} ln={ln} />;
      })}
    </div>
  );
};

export default Blog;
