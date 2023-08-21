import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./blog.module.css";

const BlogCard = ({ blog }) => {
  const router = useRouter();

  return (
    <div
      className={styles.blogCards}
      onClick={() => router.push(`/blog/${blog.id}`)}
    >
      <img src={blog.image} alt="" />
      <div className={styles.blogMainText}>
        <p>{blog.title}</p>
      </div>

      <Link href={`/blog/${blog.id}`} legacyBehavior>
        <a className={`${styles.blogText} ${styles.blogLink}`}>read more</a>
      </Link>
    </div>
  );
};

export default BlogCard;
