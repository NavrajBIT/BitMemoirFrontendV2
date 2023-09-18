import Image from "next/image";
import { useEffect, useState } from "react"; 

const Accordian = ({ heading, text, index, isOpen, onToggle }) => {
  // Use state to track window width
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    // Check if window is defined (only available in the browser)
    if (typeof window !== 'undefined') {
      // Update the window width when the component mounts
      setWindowWidth(window.innerWidth);

      // Add a resize event listener to update the window width on resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Attach the event listener
      window.addEventListener("resize", handleResize);

      // Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div key={index}>
      <div
        onClick={onToggle}
        style={{
          padding: windowWidth < 450 ? "1.5rem 1rem" : "1.5rem 2rem",
          borderBottom: "2px solid var(--primary-90)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {heading}
        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "all 0.3s",
          }}
        >
          <Image
            src={"/icons/down-arrow.svg"}
            height={10}
            width={15}
            style={{ filter: 'invert(1)' }}
          />
        </span>
      </div>
      <div
        style={{
          padding: isOpen
            ? windowWidth < 450
              ? "1.5rem 1rem"
              : "1.5rem 2rem"
            : windowWidth < 450
            ? "0rem 1rem"
            : "0rem 2rem",
          backgroundColor: "var(--primary-90)",
          maxHeight: isOpen ? "unset" : "0em",
          fontSize: "0.875rem",
          lineHeight: "2",
          overflow: "hidden",
          transition: "all 0.3s",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export default Accordian;
