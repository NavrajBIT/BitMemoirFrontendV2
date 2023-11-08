import HeroSection from "./subcomponents/heroSection";
import Whybit from "./subcomponents/whybit";
import ProductSuite from "./subcomponents/productSuite";
import FAQ from "./subcomponents/faqs/faqs";

const Home = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  return (
    <div>
      <HeroSection ln={ln} />
      <Whybit ln={ln} />
      <ProductSuite ln={ln} />
      <FAQ ln={ln} />
    </div>
  );
};

export default Home;
