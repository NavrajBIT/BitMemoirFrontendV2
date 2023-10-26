import Link from "next/link";
import style from "./blog.module.css";
import Image from "next/image";

const BlogFullCard = ({ blog }) => {
  return (
    <div
      style={{
        background: "var(--primary-90)",
        padding: "var(--padding-light)",
        borderRadius: "var(--border-radius)",
        width: "270px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          height: "30px",
          overflow: "hidden",
        }}
      >
        {blog.title}
      </div>

      <div style={{ position: "relative", height: "200px" }}>
        <Image
          src={blog.image}
          fill
          alt={blog.title}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          height: "60px",
          overflow: "hidden",
          textAlign: "justify",
        }}
      >
        {blog.content.length > 0 &&
          blog.content.map((content, index) => {
            if (content.type === "text")
              return <div key={"blog-content-" + index}>{content.value}</div>;
            else return null;
          })}
      </div>

      <Link
        href={`/blog/${blog.id}`}
        style={{
          color: "var(--primary-50)",
        }}
      >
        read more...
      </Link>
    </div>
  );
};

export default BlogFullCard;
