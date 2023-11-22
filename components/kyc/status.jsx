"use client";
import usekyc from "./usekyc";
import { useState, useEffect } from "react";
import Button from "../subcomponents/button/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";

const Status = ({ params }) => {
  const ln = params?.ln ? params.ln : "en"
  const script = usekyc(ln);
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-large)",
        paddingTop: "var(--padding-large)",
        alignItems: "center",
      }}
    >
      <StatusDetails usekyc={script} ln={ln } />
      <KYCDetails />
    </div>
  );
};

export default Status;

const StatusDetails = ({ usekyc, ln }) => {
  const router = useRouter();
  const [accountStatus, setAccountStatus] = useState(false);
  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [representativeStatus, setRepresentativeStatus] = useState(false);
  const [walletStatus, setWalletStatus] = useState(false);

  useEffect(() => {
    try {
      poppulateAccountStatus();
      poppulateOrganizationStatus();
      poppulateRepresentativeStatus();
      poppulateWalletStatus();
    } catch {}
  }, [usekyc]);

  const poppulateAccountStatus = () => {
    let account = usekyc.accountDetails;
    let email = usekyc.emailDetails;
    if (
      account.first_name &&
      account.first_name !== "" &&
      account.last_name &&
      account.last_name !== "" &&
      account.phone &&
      account.phone !== "" &&
      email.email &&
      email.email !== ""
    )
      setAccountStatus(true);
    else return setAccountStatus(false);
  };
  const poppulateOrganizationStatus = () => {
    let org = usekyc.organizationDetails;

    if (
      org.name &&
      org.name !== "" &&
      org.address &&
      org.address !== "" &&
      org.country &&
      org.country !== "" &&
      org.website &&
      org.website !== "" &&
      org.description &&
      org.description !== "" &&
      org.reg_id &&
      org.reg_id !== "" &&
      org.reg_proof &&
      org.reg_proof !== ""
    )
      setOrganizationStatus(true);
    else setOrganizationStatus(false);
  };
  const poppulateRepresentativeStatus = () => {
    let rep = usekyc.issuerDetails;

    if (
      rep.designation &&
      rep.designation !== "" &&
      rep.signed_note &&
      rep.signed_note !== ""
    )
      setRepresentativeStatus(true);
    else setRepresentativeStatus(false);
  };
  const poppulateWalletStatus = () => {
    let account = usekyc.accountDetails;

    if (account.wallet && account.wallet !== "") setWalletStatus(true);
    else return setWalletStatus(false);
  };
  const getProfileCompletedness = () => {
    let completion = 100;
    if (!accountStatus) completion = completion - 25;
    if (!organizationStatus) completion = completion - 25;
    if (!representativeStatus) completion = completion - 25;
    if (!walletStatus) completion = completion - 25;
    return completion;
  };
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width-form)",
        background: "var(--primary-90)",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-main)",
        gap: "var(--padding-main)",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "700",
          position: "absolute",
          top: "-1rem",
          left: "var(--padding-main)",
        }}
      >
        Profile Status
      </div>
      <div
        style={{
          width: "100%",
          height: "1rem",
          background: "var(--primary-110)",
          borderRadius: "var(--border-radius)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: getProfileCompletedness() + "%",
            height: "1rem",
            background: "var(--primary-50)",
            borderRadius: "var(--border-radius)",
            position: "absolute",
          }}
        />
      </div>
      <div>{getProfileCompletedness()}% complete</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}>1. Account Details</div>
        <Image
          src={accountStatus ? "/icons/ok.svg" : "/icons/notok.svg"}
          height={50}
          width={50}
          alt="status"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}>2. Organization Details</div>
        <Image
          src={organizationStatus ? "/icons/ok.svg" : "/icons/notok.svg"}
          height={50}
          width={50}
          alt="status"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}>3. Representative Details</div>
        <Image
          src={representativeStatus ? "/icons/ok.svg" : "/icons/notok.svg"}
          height={50}
          width={50}
          alt="status"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}>4. Wallet</div>
        <Image
          src={walletStatus ? "/icons/ok.svg" : "/icons/notok.svg"}
          height={50}
          width={50}
          alt="status"
        />
      </div>
      <div style={{ width: "fit-content" }}>
        <Button
          text="Edit Profile"
          variant={"secondary"}
          endIcon={"edit"}
          onClick={() => router.push(`/${ln}/kyc`)}
        />
      </div>
    </div>
  );
};

const KYCDetails = () => {
  const api = API();
  const [kycDetails, setKycDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    poppulateKycDetails();
  }, []);
  const poppulateKycDetails = async () => {
    await api
      .crud("GET", "user/kyc")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setKycDetails(res[0]);
        }
      })
      .catch((err) => console.log(err));
  };
  const apply = async () => {
    setIsLoading(true);
    await api
      .crud("PATCH", `user/kyc/${kycDetails.id}`, { is_applied: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await poppulateKycDetails();
    setIsLoading(false);
  };
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width-form)",
        background: "var(--primary-90)",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-main)",
        paddingTop: "var(--padding-main)",
        gap: "var(--padding-main)",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "700",
          position: "absolute",
          top: "-1.5rem",
          left: "var(--padding-main)",
          display: "flex",
          alignItems: "center",
        }}
      >
        KYC Status{" "}
        {kycDetails && (
          <Image
            src={
              kycDetails.status === "Approved"
                ? "/icons/ok.svg"
                : "/icons/notok.svg"
            }
            height={50}
            width={50}
            alt="status"
          />
        )}
      </div>
      <div
        style={{
          fontSize: "1.25rem",
        }}
      >
        KYC is required for the certificates to be verified.
      </div>
      {kycDetails && (
        <>
          <div>
            {!kycDetails.is_applied && (
              <Button
                text={kycDetails.comment ? "Re-Apply" : "Apply for KYC"}
                variant={"primary"}
                isLoading={isLoading}
                onClick={apply}
              />
            )}
          </div>
          {kycDetails.is_applied && (
            <div style={{ fontSize: "1.5rem", color: "green" }}>Applied</div>
          )}
          {kycDetails.is_applied && (
            <div
              style={{
                fontSize: "1.5rem",
                color: kycDetails.status === "Approved" ? "green" : "red",
              }}
            >
              Status: {kycDetails.status}
            </div>
          )}
          {kycDetails.comment && kycDetails.status !== "Approved" && (
            <div>Comment: {kycDetails.comment}</div>
          )}
        </>
      )}
    </div>
  );
};
