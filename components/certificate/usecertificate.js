import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";

const usecertificate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedtemplate] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const api = API();
  const router = useRouter();

  useEffect(() => {
    getTemplates();
    setTutorialData();
  }, []);

  const setTutorialData = () => {
    let tutorial = localStorage.getItem("templateTutorial");

    if (tutorial !== "true" && tutorial !== "false") {
      localStorage.setItem("templateTutorial", true);
      localStorage.setItem("certCreatorTutorial", true);
    }
  };

  const getTemplates = async () => {
    setIsLoading(true);
    await api
      .crud("GET", "certificate/template")
      .then((res) => {
        setTemplates(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const createNewTemplate = async () => {
    setIsLoading(true);
    await api
      .crud("POST", "certificate/template")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299)
          router.push(`/certCreator/${res.id}`);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const editTemplate = () => {
    router.push(`/certCreator/${selectedTemplate.id}`);
  };
  const deleteTemplate = async () => {
    setIsDeletePopup(false);
    setIsLoading(true);
    await api.crud("DELETE", `certificate/template/${selectedTemplate.id}`);
    setSelectedtemplate(null);
    getTemplates();
  };

  const issueCert = () => {
    router.push(`/issue/${selectedTemplate.id}`);
  };

  return {
    isLoading,
    setIsLoading,
    createNewTemplate,
    getTemplates,
    templates,
    selectedTemplate,
    setSelectedtemplate,
    editTemplate,
    deleteTemplate,
    issueCert,
    isDeletePopup,
    setIsDeletePopup,
  };
};

export default usecertificate;
