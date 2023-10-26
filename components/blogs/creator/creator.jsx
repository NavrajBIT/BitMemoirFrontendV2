"use client";
import Button from "@/components/subcomponents/button/button";
import BlogDisplay from "./blogDisplay";
import useCreator from "./useCreator";

const Blogcreator = () => {
  const creator = useCreator();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "var(--min-height-screen)",
        maxWidth: "var(--max-width)",
        margin: "auto",
        padding: "var(--padding-main)",
      }}
    >
      {creator.id ? (
        <BlogDisplay creator={creator} />
      ) : (
        <div
          style={{
            width: "100%",
            color: "var(--primary-50)",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          Create Blog
          <div style={{ width: "fit-content" }}>
            <Button
              text="Create"
              variant={"primary"}
              onClick={creator.createNew}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogcreator;
