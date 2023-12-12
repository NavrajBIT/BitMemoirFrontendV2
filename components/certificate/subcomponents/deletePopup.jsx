import Button from "@/components/subcomponents/button/button";
import Popup from "@/components/subcomponents/popup/popup";

const DeletePopup = ({ cert, ln }) => (
  <Popup>
    {cert.selectedTemplate && (
      <div
        style={{
          background: "var(--primary-100)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          padding: "var(--padding-main)",
          borderRadius: "var(--border-radius)",
          maxWidth: "var(--max-width-form)",
        }}
      >
        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
          {ln === "es"
            ? "¿Estás seguro de que quieres eliminar?"
            : "Are you sure you want to delete"}{" "}
          {cert.selectedTemplate.name} ?
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--padding-light)",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <Button
              variant="primary"
              text={ln === "es" ? "Cerrar" : "X Cancel"}
              onClick={() => cert.setIsDeletePopup(false)}
            />
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              variant="secondary"
              endIcon={"delete"}
              text={ln === "es" ? "Borrar" : "Delete"}
              onClick={cert.deleteTemplate}
            />
          </div>
        </div>
      </div>
    )}
  </Popup>
);

export default DeletePopup;
