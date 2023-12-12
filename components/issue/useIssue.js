import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import useApprover from "../approver/useApprover";
import { isValidNearAddress } from "../subcomponents/scripts/scripts";
import { useRouter } from "next/navigation";

const useIssue = (params) => {
  const api = API();
  const ln = params?.ln ? params.ln : "en";
  const approver = useApprover();
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [template, setTemplate] = useState(null);
  const [studentNumber, setStudentNumber] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [approverPopup, setApproverPopup] = useState(false);
  const [notVerifiedPopup, setNotVerifiedPopup] = useState(false);
  const [certType, setcertType] = useState("nonessential");
  const [deploymentType, setDeploymentType] = useState("static");
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [nftQuota, setNftQuota] = useState(null);

  useEffect(() => {
    poppulateTemplateData();
    poppulateNFTQuota();
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
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          setTemplate(res);
        }
      })
      .catch((err) => console.log(err));
    setLoadingStatus("");
  };

  const poppulateNFTQuota = async () => {
    await api
      .crud("GET", `subscription/nftQuota`)
      .then((res) => {
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          setNftQuota(parseInt(res.nft_quota));
        }
      })
      .catch((err) => console.log(err));
  };

  const downloadcsv = () => {
    if (!studentNumber || studentNumber <= 0) {
      setPopupStatus(() => {
        if (ln === "es") return "Por favor ingrese el número de destinatarios!";
        else {
          return "Please enter number of recipients!";
        }
      });
      return;
    }
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
              setPopupStatus(() => {
                if (ln === "es") {
                  return "Datos inválidos. Por favor verifique los datos y vuelva a intentarlo. Asegúrese de que no haya comas (,) en los datos. Descargue el formato de archivo de datos como referencia.";
                } else {
                  return "Invalid Data. Please check the data and try again. Make sure there are no commas (,) in the data. Download the Data File Format for reference.";
                }
              });
              isValid = false;
            }
          });
        } else {
          setPopupStatus(() => {
            if (ln === "es") {
              return "Datos inválidos. Por favor verifique los datos y vuelva a intentarlo. Asegúrese de que no haya comas (,) en los datos. Descargue el formato de archivo de datos como referencia.";
            } else {
              return "Invalid Data. Please check the data and try again. Make sure there are no commas (,) in the data. Download the Data File Format for reference.";
            }
          });
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
          setPopupStatus(() => {
            if (ln === "es") {
              return "Cargue un archivo .csv válido.";
            } else {
              return "Please upload a valid .csv file.";
            }
          });
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
            setPopupStatus(() => {
              if (ln === "es") {
                return `Dirección de e-mail no válida para el destinatario${
                  rowIndex + 1
                }. Proporcione una dirección de e-mail válida.`;
              } else {
                return `Invalid email address for recipient ${
                  rowIndex + 1
                }. Please provide a valid email address.`;
              }
            });
            is_valid = false;
          }
        } else if (columnIndex === row.length - 1 && cell !== "") {
          if (!isValidNearAddress(cell)) {
            setPopupStatus(() => {
              if (ln === "es") {
                return `Dirección de billetera no válida para el destinatario${
                  rowIndex + 1
                }. Proporcione una dirección de billetera válida.`;
              } else {
                return `Invalid wallet address for recipient ${
                  rowIndex + 1
                }. Please provide a valid wallet address.`;
              }
            });
            is_valid = false;
          }
        } else {
          if (
            studentData[rowIndex][row.length - 2] === "" &&
            studentData[rowIndex][row.length - 1] === ""
          ) {
            setPopupStatus(() => {
              if (ln === "es") {
                return `Tanto el correo electrónico como la billetera del destinatario${
                  rowIndex + 1
                } están vacíos. Proporcione el correo electrónico o la dirección de billetera o ambas para el destinatario.`;
              } else {
                return `Both email and wallet for recipient ${
                  rowIndex + 1
                } is empty. Please provide either email or wallet address or both for the recipient.`;
              }
            });
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
      .crud("GET", "user/kyc")
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
      .catch((err) => (is_verified = false));
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
    setLoadingStatus("Submitting Certificate Order...");
    await api
      .crud("POST", "certificate/order", apiData)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          router.push(`/${ln}/order/${res.id}`);
        }
      })
      .catch((err) => console.log(err));

    setLoadingStatus("");
  };

  return {
    notFound,
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
    approver,
    approverPopup,
    setApproverPopup,
    selectedApprovers,
    setSelectedApprovers,
    notVerifiedPopup,
    setNotVerifiedPopup,
    issueCertificates,
    nftQuota,
  };
};

export default useIssue;
