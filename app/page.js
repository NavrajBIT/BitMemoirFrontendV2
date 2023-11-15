import Home from "@/components/home/home";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";
import "./globals.css";
import AutoRouter from "@/components/subcomponents/autoRouter/autoRouter";

export default function App() {
  return (
    <>
      <AutoRouter />
      <Navbar />
      <Home params={{ ln: "en" }} />
      <Footer />
    </>
  );
}
