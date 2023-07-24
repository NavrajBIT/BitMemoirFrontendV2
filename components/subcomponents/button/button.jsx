import styles from "./button.module.css";
import Image from "next/image";

const Button = ({ text, startIcon, endIcon, onClick, variant, style }) => {
  const variantOptions = {
    primary: styles.primaryButton,
  };

  const className = variantOptions[variant];
  return (
    <button onClick={onClick} className={className} style={style && style}>
      {startIcon && (
        <Image
          height={24}
          width={24}
          src={"/icons/" + startIcon + ".svg"}
          alt={text}
        />
      )}
      {text}

      {endIcon && (
        <Image
          height={24}
          width={24}
          src={"/icons/" + endIcon + ".svg"}
          alt={text}
        />
      )}
    </button>
  );
};

export default Button;
