import ServerAPI from "../subcomponents/scripts/serversideapicall";
import NotFound from "../subcomponents/errorPages/notFound";
import Image from "next/image";

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
      <main
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "var(--primary-50)",
        }}
      >
        {blog.title}
      </main>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "var(--max-width-form)",
        }}
      >
        <Image
          src={blog.image}
          fill
          style={{ objectFit: "cover" }}
          alt={blog.title}
        />
      </div>

      <div style={{ textAlign: "justify" }}>
        <p>{blog.content}</p>
        <h1>{blog.content}</h1>
      </div>
    </div>
  );
};

export default BlogNum;
