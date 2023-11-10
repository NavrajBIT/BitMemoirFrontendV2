import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

export default function RootLayout({ children, params }) {
  return (
    <>
      <Navbar params={params} />
      {children}
      <Footer params={params} />
    </>
  );
}
