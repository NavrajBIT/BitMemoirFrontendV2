import Certificate from "@/components/verify/certificate";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

const Page = ({ params }) => {
  return (
    <>
      <Navbar />
      <Certificate params={params} />
      <Footer />
    </>
  );
};

export default Page;
