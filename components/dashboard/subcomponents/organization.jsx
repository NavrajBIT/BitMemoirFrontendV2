import Button from "@/components/subcomponents/button/button";
import style from "../dashboard.module.css";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";
import t from "../translation";

const Organization = ({ usedash, ln }) => {
  const organizationDetails = {
    name: usedash.organizationDetails.name
      ? usedash.organizationDetails.name
      : "---",
    address: usedash.organizationDetails.address
      ? usedash.organizationDetails.address
      : "---",
    country: usedash.organizationDetails.country
      ? usedash.organizationDetails.country
      : "---",
    website: usedash.organizationDetails.website
      ? usedash.organizationDetails.website
      : "---",
    description: usedash.organizationDetails.description
      ? usedash.organizationDetails.description
      : "---",
    reg_id: usedash.organizationDetails.reg_id
      ? usedash.organizationDetails.reg_id
      : "---",
    reg_proof:
      usedash.organizationDetails.reg_proof &&
      usedash.organizationDetails.reg_proof,
  };

  const get_filename = (url) => {
    try {
      const parts = url.split("/");
      return parts[parts.length - 1];
    } catch {
      return "loading";
    }
  };

  return (
    <div className={style.sectionContainer}>
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
        {t["Organization Details"][ln]}
      </div>

      <div style={{ fontSize: "1.5rem", padding: "var(--padding-light) 0px" }}>
        {organizationDetails.name}
      </div>
      <div style={{ display: "flex", gap: "var(--padding-light)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
            justifyContent: "center",
          }}
        >
          <div>{t["Description"][ln]}: </div>
          <div>{t["Address"][ln]}: </div>
          <div>{t["Country"][ln]}: </div>
          <div>Website: </div>
          <div>{t["Registration Id"][ln]}: </div>
          <div>{t["Registration Proof"][ln]}: </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
            justifyContent: "center",
          }}
        >
          <div>{organizationDetails.description}</div>
          <div>{organizationDetails.address}</div>
          <div>{organizationDetails.country}</div>
          <div>{organizationDetails.website}</div>
          <div>{organizationDetails.reg_id}</div>
          {organizationDetails.reg_proof ? (
            <Button
              variant={"tertiary"}
              endIcon={"download"}
              text={get_filename(organizationDetails.reg_proof)}
              style={{ height: "1rem" }}
              onClick={() =>
                downloadFile(
                  organizationDetails.reg_proof,
                  get_filename(organizationDetails.reg_proof)
                )
              }
            />
          ) : (
            <div>---</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organization;
