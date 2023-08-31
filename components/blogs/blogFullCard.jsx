import Link from "next/link";
import styles from "./blog.module.css";
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
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}>
          {blog.title}
        </div>
        <Image
          src={blog.image}
          width={250}
          height={200}
          alt={blog.title}
          style={{ borderRadius: "var(--border-radius)" }}
        />
      </div>

      <Link href={`/blog/${blog.id}`}>read more</Link>
    </div>
  );
};

export default BlogFullCard;
