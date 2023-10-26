import style from "../blogdisplay.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";

const BlogDisplay = ({ creator }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <TitleInput title={creator.title} onChange={creator.updateTitle} />
      <BlogImage image={creator.image} onChange={creator.updateimage} />
      <div>{creator.timeStamp}</div>
      {creator.content.length > 0 &&
        creator.content.map((content, index) => {
          if (content.type === "text")
            return (
              <TextDisplay
                content={content}
                setContent={creator.setContent}
                index={index}
                key={content + index}
              />
            );
          if (content.type === "image")
            return (
              <ImageDisplay
                content={content}
                setContent={creator.setContent}
                index={index}
                key={content + index}
              />
            );
        })}
      <ToolBar setContent={creator.setContent} addImage={creator.addImage} />
      <div>
        <Button
          text="Save"
          endIcon={"save"}
          variant={"primary"}
          onClick={creator.saveBlog}
        />
      </div>
      {creator.isLoading && <LocalLoading />}
    </div>
  );
};

export default BlogDisplay;

const TitleInput = ({ title, onChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [inputheight, setInputHeight] = useState("20px");
  const inputRef = useRef(null);
  const textRef = useRef(null);

  function textAreaAdjust() {
    let textArea = inputRef.current;
    let text = textRef.current;
    let height = "20px";
    try {
      height = text.scrollHeight + "px";
    } catch {
      height = textArea.scrollHeight + "px";
    }

    try {
      setInputHeight(height);
    } catch {
      console.log("none");
    }
  }

  if (isSelected)
    return (
      <textarea
        onKeyUp={textAreaAdjust}
        className={style.title}
        onBlur={() => setIsSelected((prev) => !prev)}
        onChange={onChange}
        style={{
          background: "transparent",
          resize: "none",
          font: "inherit",
          fontSize: "1.5rem",
          fontWeight: "600",
          height: inputheight,
        }}
        value={title}
        ref={inputRef}
      />
    );

  return (
    <div
      className={style.title}
      onClick={() => {
        setIsSelected((prev) => !prev);
        textAreaAdjust();
      }}
      ref={textRef}
    >
      {title}
    </div>
  );
};

const BlogImage = ({ image, onChange }) => {
  if (image) {
    image = image.replace("localhost", "127.0.0.1");
  }
  const selectImage = () => {
    const myinput = document.createElement("input");
    myinput.setAttribute("type", "file");
    myinput.addEventListener("change", (e) => {
      onChange(e.target.files[0]);
    });
    myinput.click();
    myinput.remove();
  };
  return (
    <div className={style.blogImageContainer} onClick={selectImage}>
      <Image
        fill
        src={image ? image : "/icons/upload.svg"}
        alt="title image"
        style={{ objectFit: image ? "cover" : "contain" }}
      />
    </div>
  );
};

const TextDisplay = ({ content, setContent, index }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [inputheight, setInputHeight] = useState("20px");
  const inputRef = useRef(null);
  const textRef = useRef(null);

  function textAreaAdjust(e) {
    try {
      if (e.key === "Enter") e.preventDefault();
    } catch {
      console.log("none");
    }
    let textArea = inputRef.current;
    let text = textRef.current;
    let height = "20px";
    try {
      height = text.scrollHeight + "px";
    } catch {
      height = textArea.scrollHeight + "px";
    }

    try {
      setInputHeight(height);
    } catch {
      console.log("none");
    }
  }

  if (isSelected)
    return (
      <div style={{ position: "relative" }}>
        <textarea
          className={style.textDisplay}
          onKeyUp={textAreaAdjust}
          onBlur={() => setIsSelected((prev) => !prev)}
          onChange={(e) =>
            setContent((prev) => {
              let newContent = [...prev];
              newContent[index]["value"] = e.target.value.replace(/\n/g, "");
              return newContent;
            })
          }
          style={{
            background: "transparent",
            resize: "none",
            font: "inherit",
            fontSize: "1rem",
            height: inputheight,
          }}
          ref={inputRef}
          value={content.value}
        />
        <div
          style={{
            width: "fit-content",
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          <Button
            variant={"primary"}
            endIcon={"delete"}
            onClick={() =>
              setContent((prev) => {
                let newContent = [...prev];
                newContent.splice(index, 1);
                return newContent;
              })
            }
          />
        </div>
      </div>
    );
  return (
    <div
      className={style.textDisplay}
      ref={textRef}
      onClick={() => {
        setIsSelected((prev) => !prev);
        textAreaAdjust();
      }}
    >
      {content.value}
    </div>
  );
};

const ImageDisplay = ({ content, setContent, index }) => {
  const [isSelected, setIsSelcted] = useState(false);
  if (content.value) {
    content.value = content.value.replace("localhost", "127.0.0.1");
  }
  return (
    <div
      className={style.blogImageContainer}
      onMouseEnter={() => setIsSelcted(true)}
      onMouseLeave={() => setIsSelcted(false)}
    >
      <Image
        src={content.value}
        alt="Blog Image"
        fill
        style={{ objectFit: "cover" }}
      />
      {isSelected && (
        <div
          style={{
            width: "fit-content",
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          <Button
            variant={"primary"}
            endIcon={"delete"}
            onClick={() =>
              setContent((prev) => {
                let newContent = [...prev];
                newContent.splice(index, 1);
                return newContent;
              })
            }
          />
        </div>
      )}
    </div>
  );
};

const ToolBar = ({ setContent, addImage }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--padding-light)",
        padding: "var(--padding-main)",
        background: "var(--primary-90)",
        borderRadius: "var(--border-radius)",
        width: "fit-content",
      }}
    >
      <div style={{ width: "fit-content" }}>
        <Button
          variant={"primary"}
          text="Text"
          onClick={() =>
            setContent((prev) => {
              return [
                ...prev,
                {
                  type: "text",
                  isBold: false,
                  isItalic: false,
                  value: "Enter Text Here...(Click to edit!!)",
                },
              ];
            })
          }
        />
      </div>
      <div style={{ width: "fit-content" }}>
        <Button variant={"primary"} text="Image" onClick={addImage} />
      </div>
    </div>
  );
};
