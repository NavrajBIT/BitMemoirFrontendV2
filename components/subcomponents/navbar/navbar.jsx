import Image from "next/image";
import Link from "next/link";
import LoginButton from "./loginButton";

const Navbar = () => {
  return (
    <nav
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--padding-main)",
      }}
    >
      <Link href="/home">
        <Image height={80} width={150} src="/assets/logo.png" alt="BitMemoir" />
      </Link>
      <div>
        <Link className="link" href="/mint">
          Issue
        </Link>
        <Link className="link" href="/view">
          View
        </Link>
        <Link className="link" href="/verify">
          Verify
        </Link>
      </div>
      <LoginButton />
    </nav>
  );
};

export default Navbar;
