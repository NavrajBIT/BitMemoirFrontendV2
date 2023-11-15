"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const AutoNestedRouter = () => {
  const router = useRouter();
  const path = usePathname();
  const routeFromLocalStorage = () => {
    const language = localStorage.getItem("ln");
    console.log(language);
    if (language !== null && language !== "null") {
      console.log(path);
      router.push(`/${language}/${path}`);
    }
  };

  useEffect(() => {
    routeFromLocalStorage();
  }, []);

  return null;
};

export default AutoNestedRouter;
