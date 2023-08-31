import Button from "@/components/subcomponents/button/button";
import style from "../dashboard.module.css";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";

const Representative = ({ usedash }) => {
  const representativeDetails = {
    designation: usedash.issuerDetails.designation
      ? usedash.issuerDetails.designation
      : "---",
    signed_note:
      usedash.issuerDetails.signed_note && usedash.issuerDetails.signed_note,
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
        Representative Details
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
          <div>Designation: </div>
          <div>Signed Note from Authority: </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
            justifyContent: "center",
          }}
        >
          <div>{representativeDetails.designation}</div>

          {representativeDetails.signed_note ? (
            <Button
              variant={"tertiary"}
              text={get_filename(representativeDetails.signed_note)}
              style={{ height: "1rem" }}
              onClick={() =>
                downloadFile(
                  representativeDetails.signed_note,
                  get_filename(representativeDetails.signed_note)
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

export default Representative;
