"use client";
import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import Loading from "../subcomponents/loadingPage/loading";
import NotFound from "../subcomponents/errorPages/notFound";

const containerStyle = {
  // border: '2px solid red',
  maxWidth: "65rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  padding: "0 1rem",
};

const BlogNum = ({ params }) => {
  const api = API();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .blog(params.blogId)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) setBlog(res);
        if (res.status === 404) setNotFound(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!blog && !notFound) return <Loading />;
  if (notFound) return <NotFound />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <div style={containerStyle}>
        <h2 style={{ marginTop: "2rem" }}>{blog.title}</h2>
        <img src={blog.image} alt={blog.title} style={{ margin: "2rem 0" }} />
        <p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </p>
      </div>
    </div>
  );
};

export default BlogNum;
