import Link from "next/link";
import styles from "./blog.module.css";
import Image from "next/image";

const BlogCard = ({ blog, ln }) => {
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
      }}
    >
      <Image
        src={blog.image}
        width={250}
        height={200}
        alt={blog.title}
        style={{ borderRadius: "var(--border-radius)", objectFit: "cover" }}
      />
      <div style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}>
        {blog.title}
      </div>

      <Link
        href={`/${ln}/blog/${blog.id}`}
        style={{ color: "var(--primary-50)" }}
      >
        read more...
      </Link>
    </div>
  );
};

export default BlogCard;
