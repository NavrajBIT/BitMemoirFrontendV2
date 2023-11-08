import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import t from "./translation";

const useApprover = (ln) => {
  const api = API();
  const [approversList, setApproversList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    poppulateApprovers();
  }, []);

  const poppulateApprovers = async () => {
    setIsLoading(true);
    await api
      .crud("GET", "user/approver")
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) setApproversList(res);
      })
      .catch((er) => console.log(er));
    setIsLoading(false);
  };

  const addApprover = async (data) => {
    setIsLoading(true);
    console.log(ln);
    await api
      .crud("POST", "user/approver", {
        name: data[t[ln]["Name"]],
        designation: data[t[ln]["Designation"]],
        email: data[t[ln]["Email"]],
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setIsLoading(false);
    poppulateApprovers();
  };

  const deleteApprover = async (approver) => {
    setIsLoading(true);
    console.log(approver);
    await api
      .crud("DELETE", `user/approver/${approver.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsLoading(false);
    poppulateApprovers();
  };

  return {
    approversList,
    isLoading,
    addApprover,
    deleteApprover,
  };
};

export default useApprover;
