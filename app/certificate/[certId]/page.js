import Certificate from "@/components/verify/certificate";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";
import AutoNestedRouter from "@/components/subcomponents/autoRouter/autoNestedRouter";

const Page = ({ params }) => {
  return (
    <>
      <AutoNestedRouter />
      <Navbar />
      <Certificate params={params} />
      <Footer />
    </>
  );
};

export default Page;
