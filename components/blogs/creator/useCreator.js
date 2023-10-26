import { useState, useEffect } from "react";
import API from "@/components/subcomponents/scripts/apiCall";
import { getTime } from "@/components/subcomponents/scripts/scripts";

const useCreator = () => {
  const api = API();
  const [status, setStatus] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("Blog Title (Click to edit)");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState([]);
  const [timeStamp, setTimeStamp] = useState(null);

  const createNew = async () => {
    api
      .crud("POST", "blog/create", { title: title })
      .then((res) => {
        console.log(res);
        if (res.status === 403) alert(res.detail);
        if (res.status >= 200 && res.status <= 299) {
          setId(res.id);
          setTimeStamp(getTime(res.timestamp));
        }
      })
      .catch((err) => console.log(err));
  };

  const updateTitle = (e) => {
    if (e.target.value.length > 500)
      alert("Maximum length of title is 500 characters.");
    else {
      setTitle(e.target.value);
    }
  };

  const updateimage = (file) => {
    const formdata = new FormData();
    formdata.append("image", file);
    api
      .crud("PATCH", `blog/update/${id}`, formdata, true)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setImage(res.image);
        }
      })
      .catch((err) => console.log(err));
  };

  const addImage = () => {
    const myinput = document.createElement("input");
    myinput.setAttribute("type", "file");
    myinput.addEventListener("change", async (e) => {
      let imageFile = e.target.files[0];
      setisLoading(true);
      let formdata = new FormData();
      formdata.append("blog", id);
      formdata.append("image", imageFile);
      await api
        .crud("POST", "blog/addImage", formdata, true)
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            let imageURL = res.image;
            setContent((prev) => {
              let newContent = [...prev, { type: "image", value: imageURL }];
              return newContent;
            });
          }
        })
        .catch((err) => console.log(err));
      setisLoading(false);
    });
    myinput.click();
    myinput.remove();
  };

  const saveBlog = async () => {
    setisLoading(true);
    await api
      .crud("PATCH", `blog/update/${id}`, { content: content, title: title })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setisLoading(false);
  };

  return {
    status,
    isLoading,
    id,
    title,
    image,
    content,
    setContent,
    timeStamp,
    createNew,
    updateTitle,
    updateimage,
    addImage,
    saveBlog,
  };
};

export default useCreator;
