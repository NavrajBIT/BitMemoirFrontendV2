import Certificate from "@/components/certificate/certificate";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";
import AutoNestedRouter from "@/components/subcomponents/autoRouter/autoNestedRouter";

const Page = () => {
  return (
    <>
      <AutoNestedRouter />
      <Navbar />
      <Certificate />;
      <Footer />
    </>
  );
};

export default Page;
