"use client";
import { useState } from "react";
import Button from "../button/button";
import { usePathname, useRouter } from "next/navigation";

const LanguageSelector = () => {
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function changePath(path, languageCode) {
    const pathParts = path.split("/");
    if (pathParts.length > 1) {
      pathParts[1] = languageCode;
      return pathParts.join("/");
    } else {
      return `/${languageCode}${path}`;
    }
  }

  const selectLanguage = (ln) => {
    localStorage.setItem("ln", ln);
    setIsClicked(false);
    let currentPath = pathname;
    let newPath = changePath(currentPath, ln);
    router.push(newPath);
  };

  return (
    <div style={{ width: "fit-content", position: "relative" }}>
      <Button
        endIcon={"language"}
        variant={"tertiary"}
        text={""}
        onClick={() => setIsClicked((prev) => !prev)}
      />
      {isClicked && <LanguageDropDown selectLanguage={selectLanguage} />}
    </div>
  );
};

export default LanguageSelector;

const LanguageDropDown = ({ selectLanguage }) => {
  return (
    <div
      style={{
        position: "absolute",
        background: "var(--primary-90)",
        padding: "var(--padding-light)",
        zIndex: "2",
        border: "1px solid var(--primary-50)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <Button
        variant={"tertiary"}
        text={"English"}
        onClick={() => selectLanguage("en")}
      />
      <Button
        variant={"tertiary"}
        text={"Español"}
        onClick={() => selectLanguage("es")}
      />
      <Button
        variant={"tertiary"}
        text={"عربي"}
        onClick={() => selectLanguage("ar")}
      />
    </div>
  );
};
