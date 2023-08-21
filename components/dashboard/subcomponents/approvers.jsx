import Button from "@/components/subcomponents/button/button";
import style from "../dashboard.module.css";
import { useRouter } from "next/navigation";
import { ApproverCard } from "@/components/approver/approverList";

const Approvers = ({ usedash }) => {
  const router = useRouter();
  return (
    <div
      className={style.sectionContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          position: "absolute",
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "700",
          top: "-1rem",
          left: "var(--padding-main)",
        }}
      >
        Approvers
      </div>
      Approvers can approve the issuance of Essential (degree) certificates.
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "var(--padding-light)",
        }}
      >
        {usedash.approversList &&
          usedash.approversList.length > 0 &&
          usedash.approversList.map((approver, index) => (
            <ApproverCard
              key={"approver-" + index}
              approver={approver}
              script={usedash}
            />
          ))}
      </div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <Button
          text={"Add Approvers +"}
          variant={"secondary"}
          onClick={() => router.push("/approver")}
        />
      </div>
    </div>
  );
};

export default Approvers;
