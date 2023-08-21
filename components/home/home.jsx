import HeroSection from "./subcomponents/heroSection";
import Whybit from "./subcomponents/whybit";
import ProductSuite from "./subcomponents/productSuite";
import FAQ from "./subcomponents/faqs/faqs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Whybit />
      <ProductSuite />
      <FAQ />
    </div>
  );
};

export default Home;
