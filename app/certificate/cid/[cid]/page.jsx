import CIDCertificate from "@/components/verify/cidCertificate";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";
import AutoNestedRouter from "@/components/subcomponents/autoRouter/autoNestedRouter";

const Page = ({ params }) => {
  return (
    <>
      <Navbar />
      <CIDCertificate params={params} />
      <Footer />
      <AutoNestedRouter />
    </>
  );
};

export default Page;
