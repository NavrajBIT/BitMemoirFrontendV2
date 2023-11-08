import NotFound from "@/components/subcomponents/errorPages/notFound";
import Navbar from "@/components/subcomponents/navbar/navbar";
import Footer from "@/components/subcomponents/footer/footer";

const Page = () => {
  return (
    <>
      <Navbar />
      <NotFound />
      <Footer />
    </>
  );
};

export default Page;
