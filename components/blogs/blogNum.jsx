import ServerAPI from "../subcomponents/scripts/serversideapicall";
import NotFound from "../subcomponents/errorPages/notFound";
import Image from "next/image";
import style from "./blogdisplay.module.css";
import LinkButton from "../subcomponents/button/link";

const api = ServerAPI();
const getBlogDetail = async (blogId) => {
  return await api
    .crud("GET", `blog/${blogId}`)
    .then((res) => res)
    .catch((err) => null);
};

const BlogNum = async ({ params }) => {
  const blog = await getBlogDetail(params.blogId);

  if (!blog) return <NotFound />;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        minHeight: "var(--min-height-screen)",
        padding: "var(--padding-main)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <title>{blog.title}</title>
      <div style={{ width: "fit-content" }}>
        <LinkButton text="< back" href={"/blog"} variant={"secondary"} />
      </div>
      <main className={style.title}>{blog.title}</main>
      <div className={style.blogImageContainer}>
        <Image
          src={blog.image}
          fill
          style={{ objectFit: "cover" }}
          alt={blog.title}
        />
      </div>
      {blog.content.length > 0 &&
        blog.content.map((content, index) => {
          if (content.type === "text")
            return (
              <div className={style.textDisplay} key={"blog-text-" + index}>
                {content.value}
              </div>
            );
          if (content.type === "image")
            return (
              <div
                className={style.blogImageContainer}
                key={"blog-image-" + index}
              >
                <Image
                  src={content.value}
                  alt="Blog Image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
        })}
    </div>
  );
};

export default BlogNum;
