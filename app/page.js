import Home from "@/components/home/home";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Home params={{ ln: "en" }} />
      <Footer />
    </>
  );
}
