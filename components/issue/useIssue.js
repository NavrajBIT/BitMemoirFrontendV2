import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import useApprover from "../approver/useApprover";

const useIssue = (params) => {
  const api = API();
  const approver = useApprover();
  const [loadingStatus, setLoadingStatus] = useState("");
  const [popupStatus, setPopupStatus] = useState("");
  const [template, setTemplate] = useState(null);
  const [studentNumber, setStudentNumber] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [approverPopup, setApproverPopup] = useState(false);
  const [notVerifiedPopup, setNotVerifiedPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [certType, setcertType] = useState("nonessential");
  const [deploymentType, setDeploymentType] = useState("static");
  const [orderId, setOrderId] = useState(null);
  const [selectedApprovers, setSelectedApprovers] = useState([]);

  useEffect(() => {
    poppulateTemplateData();
  }, []);

  const handleStudentNumberChange = (e) => {
    setStudentNumber(e);
    setStudentData(
      Array.from({ length: e }, () =>
        Array.from({ length: template.variables.length + 2 }, () => "")
      )
    );
  };

  const poppulateTemplateData = async () => {
    setLoadingStatus("Loading...");
    await api
      .crud("GET", `certificate/template/${params.templateId}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setTemplate(res);
        }
      })
      .catch((err) => console.log(err));
    setLoadingStatus("");
  };

  const downloadcsv = () => {
    const headers = [
      "S.No.",
      ...Array.from(
        { length: template.variables.length },
        (_, idx) => `${template.variables[idx]["name"]}`
      ),
      "Email",
      "Wallet",
    ];
    const csvData = [
      headers,
      ...studentData.map((row, idx) => [idx + 1, ...row]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spreadsheet.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const uploadcsv = () => {
    const uploader = document.createElement("input");
    uploader.setAttribute("type", "file");
    uploader.onchange = (event) => {
      const trimFirstColumn = (data) => {
        data = data.slice(1);
        const trimmedData = data.map((row) => row.slice(1));
        return trimmedData;
      };

      const parseCSV = (csvContent) => {
        const rows = csvContent.split("\n");
        const parsedData = rows.map((row) => {
          return row.split(",");
        });
        let finalPardesData = [];
        parsedData.map((row) => {
          if (row.length === template.variables.length + 3) {
            let newRow = [];
            row.map((cell) => {
              let newCell = cell.replaceAll('"', "");
              newCell = newCell.replaceAll("\r", "");
              newRow.push(newCell);
            });
            finalPardesData.push(newRow);
          }
        });
        console.log(finalPardesData);
        return finalPardesData;
      };

      const checkData = (data) => {
        let isValid = true;
        if (data.length > 0) {
          data.map((row) => {
            if (row.length !== template.variables.length + 2) {
              setPopupStatus(
                "Invalid Data. Please check the data and try again. Make sure there are no commas (,) in the data. Download the Data File Format for reference."
              );
              isValid = false;
            }
          });
        } else {
          setPopupStatus(
            "Invalid Data. Please check the data and try again. Make sure there are no commas (,) in the data. Download the Data File Format for reference."
          );
          isValid = false;
        }
        return isValid;
      };

      const handleFileRead = (event) => {
        const csvContent = event.target.result;
        const parsedData = parseCSV(csvContent);
        const trimmedData = trimFirstColumn(parsedData);
        const isValid = checkData(trimmedData);
        if (isValid) {
          setStudentNumber(trimmedData.length);
          setStudentData(trimmedData);
        }
        uploader.remove();
      };

      const file = event.target.files[0];
      if (file) {
        if (!file.name.endsWith(".csv")) {
          setPopupStatus("Please upload a valid .csv file.");
          uploader.remove();
          return;
        }
        const reader = new FileReader();
        reader.onload = handleFileRead;
        reader.readAsText(file);
      }
    };
    uploader.click();
  };

  const checkData = () => {
    let is_valid = true;
    studentData.map((row, rowIndex) => {
      row.map((cell, columnIndex) => {
        if (columnIndex < row.length - 2) {
          if (cell === "") {
            setPopupStatus(
              `${template.variables[columnIndex]["name"]} for student ${
                rowIndex + 1
              } is empty. Please fill in the data.`
            );
            is_valid = false;
          }
        } else if (columnIndex === row.length - 2 && cell !== "") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(cell)) {
            setPopupStatus(
              `Invalid email address for student ${
                rowIndex + 1
              }. Please provide a valid email address.`
            );
            is_valid = false;
          }
        } else {
          if (
            studentData[rowIndex][row.length - 2] === "" &&
            studentData[rowIndex][row.length - 1] === ""
          ) {
            setPopupStatus(
              `Both email and wallet for student ${
                rowIndex + 1
              } is empty. Please provide either email or wallet address or both for the student.`
            );
            is_valid = false;
          }
        }
      });
    });
    return is_valid;
  };
  const handleNext = () => {
    const is_valid = checkData();
    if (is_valid) {
      setConfirmPopup(true);
    }
  };

  const getApiData = () => {
    let apiData = {
      template: params.templateId,
      type: deploymentType,
      certificates: [],
    };

    apiData["approvals"] = [];
    selectedApprovers.map((approver) => {
      apiData["approvals"].push({ approver: approver });
    });

    studentData.map((row, index) => {
      let rowData = {
        email: row[row.length - 2],
        wallet: row[row.length - 1],
        variablevalues: [],
      };
      template.variables.map((variable, varIndex) => {
        rowData.variablevalues.push({
          variable: variable.id,
          value: row[varIndex],
        });
      });
      apiData.certificates.push(rowData);
    });
    return apiData;
  };

  const checkIsVerified = async () => {
    let is_verified = true;
    setLoadingStatus("Checking data...");
    await api
      .crud("GET", "/user/kyc")
      .then((res) => {
        console.log(res);
        if (
          res.status >= 200 &&
          res.status <= 299 &&
          res[0].status !== "Approved"
        ) {
          is_verified = false;
        }
      })
      .catch((err) => console.log(err));
    setLoadingStatus("");
    return is_verified;
  };

  const placeOrder = async () => {
    setApproverPopup(false);
    setConfirmPopup(false);
    const is_verified = await checkIsVerified();
    if (!is_verified) {
      setNotVerifiedPopup(true);
      return;
    }
    issueCertificates();
  };

  const issueCertificates = async () => {
    let apiData = getApiData();
    console.log(apiData);
    setLoadingStatus("Submitting Certificate Order...");
    await api
      .crud("POST", "certificate/order", apiData)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setOrderId(res.id);
          setSuccessPopup(true);
        }
      })
      .catch((err) => console.log(err));

    setLoadingStatus("");
  };

  return {
    loadingStatus,
    setLoadingStatus,
    template,
    studentNumber,
    setStudentNumber,
    uploadcsv,
    studentData,
    setStudentData,
    handleNext,
    downloadcsv,
    popupStatus,
    setPopupStatus,
    handleStudentNumberChange,
    confirmPopup,
    setConfirmPopup,
    placeOrder,
    certType,
    setcertType,
    deploymentType,
    setDeploymentType,
    successPopup,
    setSuccessPopup,
    orderId,
    approver,
    approverPopup,
    setApproverPopup,
    selectedApprovers,
    setSelectedApprovers,
    notVerifiedPopup,
    setNotVerifiedPopup,
    issueCertificates,
  };
};

export default useIssue;
