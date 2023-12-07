import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";
import LanguageSaver from "@/components/subcomponents/autoRouter/languageSaver";

export default function RootLayout({ children, params }) {
  return (
    <>
      <Navbar params={params} />
      {children}
      <LanguageSaver params={params} />
      <Footer params={params} />
    </>
  );
}
