import styles from "./button.module.css";
import Link from "next/link";
import Image from "next/image";

const LinkButton = ({
  text,
  startIcon,
  endIcon,
  href,
  variant,
  style,
  target,
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
    <Link
      href={href}
      className={className}
      style={style && style}
      target={target}
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
    </Link>
  );
};

export default LinkButton;
