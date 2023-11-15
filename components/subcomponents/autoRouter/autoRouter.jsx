"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const AutoRouter = () => {
  const router = useRouter();
  const routeFromLocalStorage = () => {
    const language = localStorage.getItem("ln");
    console.log(language);
    if (language !== null && language !== "null") {
      router.push(language);
    }
  };

  useEffect(() => {
    routeFromLocalStorage();
  }, []);

  return null;
};

export default AutoRouter;
