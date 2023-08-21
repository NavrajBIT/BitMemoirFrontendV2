"use client";
import BlogCard from "./blogCard";
import styles from "./blog.module.css";
import useblog from "./useblog";

const Blog = () => {
  const { blogs } = useblog();
  console.log(blogs);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        minHeight: "var(--min-height-screen)",
        margin: "auto",
        padding: "var(--padding-main)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div className={styles.blogHeader}>
        <h3>Top Blogs</h3>
        <div>
          <button className={styles.button}>Sort</button>
          <button className={styles.button}>Filter</button>
        </div>
      </div> */}

      <div className={styles.blogCardsDiv}>
        {blogs.map((blog, index) => {
          return <BlogCard key={"blog-" + index} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
