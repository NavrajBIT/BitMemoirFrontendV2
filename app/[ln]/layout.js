import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bitmemoir: Verified Certificates over Blockchain",
  description: "Transforming the education system",
};

export default function RootLayout({ children, params }) {
  return (
    <>
      <Navbar params={params} />
      {children}
      <Footer params={params} />
    </>
  );
}
