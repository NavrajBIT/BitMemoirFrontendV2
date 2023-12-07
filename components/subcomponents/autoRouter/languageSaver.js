"use client";
import { useEffect } from "react";

const LanguageSaver = ({ params }) => {
  useEffect(() => {
    localStorage.setItem("ln", params.ln);
  }, []);
  return null;
};

export default LanguageSaver;
