import styles from "./button.module.css";
import Image from "next/image";

const Button = ({
  text,
  startIcon,
  endIcon,
  onClick,
  variant,
  style,
  type,
  isLoading,
}) => {
  const variantOptions = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    tertiary: styles.tertiaryButton,
    emphasis: styles.emphasisButton,
  };

  const className = variantOptions[variant];
  return (
    <button
      onClick={onClick}
      className={className}
      style={style && style}
      type={type ? type : "button"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Image
          src={"/icons/loading.svg"}
          width={25}
          height={25}
          className={styles.loading}
          alt={text}
        />
      ) : (
        <>
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
        </>
      )}
    </button>
  );
};

export default Button;
