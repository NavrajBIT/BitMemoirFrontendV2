import CIDCertificate from "@/components/verify/cidCertificate";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

const Page = ({ params }) => {
  return (
    <>
      <Navbar />
      <CIDCertificate params={params} />
      <Footer />
    </>
  );
};

export default Page;
