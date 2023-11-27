import { useState } from "react";
import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";

const Contract = ({ usedash, ln }) => {
  const url = usedash?.contractDetails?.verification_url
    ? usedash?.contractDetails?.verification_url
    : `${process.env.NEXT_PUBLIC_LOCATION}${ln}/certificate/`;

  const [isEdittingURL, setIsEdittingURL] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      Verify URL:
      {url}
      <div style={{ width: "fit-content" }}>
        <Button
          text={""}
          endIcon={"edit"}
          variant={"tertiary"}
          onClick={() => setIsEdittingURL(true)}
        />
      </div>
      {isEdittingURL && (
        <EditUrlPopup
          usedash={usedash}
          ln={ln}
          setIsEdittingURL={setIsEdittingURL}
        />
      )}
    </div>
  );
};

export default Contract;

const EditUrlPopup = ({ usedash, ln, setIsEdittingURL }) => {
  const url = usedash?.contractDetails?.verification_url
    ? usedash?.contractDetails?.verification_url
    : `${process.env.NEXT_PUBLIC_LOCATION}${ln}/certificate/`;
  const [newURL, setNewURL] = useState(url);
  const [hasChanged, setHasChanged] = useState(false);

  return (
    <Popup>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "var(--max-width-form)",
          padding: "var(--padding-main)",
          gap: "var(--padding-main)",
          background: "var(--primary-100)",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            color: "var(--primary-50)",
            fontWeight: "bold",
          }}
        >
          Verification URL
        </div>
        <div>
          Verification url is included in the certificate QR codes. Change this
          value if you want to redirect the QR codes to a custom location.
        </div>
        <div>Enter Verification URL:</div>
        <div style={{ width: "100%" }}>
          <LocalInputField
            inputData={{
              label: "URL",
              type: "text",
            }}
            value={newURL}
            handleChange={(e) => {
              setNewURL(e.target.value);
              setHasChanged(true);
            }}
            maxLength={100}
          />
        </div>
        <div>
          Certificate QR code will open: {newURL}
          <span style={{ color: "var(--primary-60)", fontStyle: "italic" }}>
            CertId
          </span>
          /
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--padding-light)",
            width: "100%",
          }}
        >
          {hasChanged && (
            <Button
              text={"Save"}
              endIcon={"save"}
              variant={"primary"}
              onClick={() => {
                usedash.changeVerifyURL(newURL);
                setIsEdittingURL(false);
              }}
            />
          )}
          <Button
            text={"Cancel X"}
            variant={"secondary"}
            onClick={() => setIsEdittingURL(false)}
          />
        </div>
      </div>
    </Popup>
  );
};
