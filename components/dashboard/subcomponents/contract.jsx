import { useState } from "react";
import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { isValidNearAddress } from "@/components/subcomponents/scripts/scripts";

const Contract = ({ usedash, ln }) => {
  const [isEditting, setIsEditting] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      Smart Contract :{" "}
      {usedash?.contractDetails?.contract_address
        ? usedash?.contractDetails?.contract_address
        : "Default"}
      <div style={{ width: "fit-content" }}>
        <Button
          text={""}
          endIcon={"edit"}
          variant={"tertiary"}
          onClick={() => setIsEditting(true)}
        />
      </div>
      {isEditting && (
        <EditContractPopup
          usedash={usedash}
          ln={ln}
          setIsEditting={setIsEditting}
        />
      )}
    </div>
  );
};

export default Contract;

const EditContractPopup = ({ usedash, ln, setIsEditting }) => {
  const url = usedash?.contractDetails?.contract_address
    ? usedash?.contractDetails?.contract_address
    : "";
  const [newAddress, setNewAddress] = useState(url);
  const [privateKey, setPrivateKey] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    setStatus("");
    if (isValidNearAddress(newAddress)) {
      usedash.changeContractDetails(newAddress, privateKey);
      setIsEditting(false);
    } else setStatus("Please enter a valid address on NEAR protocol.");
  };

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
          Smart Contract
          <div
            style={{
              fontSize: "1rem",
              textAlign: "center",
              color: "var(--primary-50)",
            }}
          >
            {"("}NEAR Protocol{")"}
          </div>
        </div>
        <div>
          Bitmemoir will use this smart contract to mint the Certificates.
        </div>
        <div style={{ color: "var(--error)" }}>
          Warning: You will be in-charge of the smart contract.
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
          }}
        >
          <div>Enter Contract Address:</div>
          <LocalInputField
            inputData={{
              label: "Contract Address",
              type: "text",
            }}
            value={newAddress}
            handleChange={(e) => {
              setNewAddress(e.target.value);
              setHasChanged(true);
            }}
            maxLength={100}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
          }}
        >
          <div>Enter Private Key:</div>
          <LocalInputField
            inputData={{
              label: "Private Key",
              type: "text",
            }}
            value={privateKey}
            handleChange={(e) => {
              setPrivateKey(e.target.value);
              setHasChanged(true);
            }}
            maxLength={100}
          />
        </div>
        <div style={{ color: "var(--error)" }}>{status}</div>
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
              onClick={handleSubmit}
            />
          )}
          <Button
            text={"Cancel X"}
            variant={"secondary"}
            onClick={() => setIsEditting(false)}
          />
        </div>
        <div
          style={{
            width: "fit-content",
          }}
        >
          <Button
            variant="tertiary"
            text="Restore Default"
            onClick={() => {
              usedash.changeContractDetails(null, null);
              setIsEditting(false);
            }}
          />
        </div>
      </div>
    </Popup>
  );
};
