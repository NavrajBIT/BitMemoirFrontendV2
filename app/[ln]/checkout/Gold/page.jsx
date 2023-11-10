import Checkout from "@/components/checkout/checkout";

const page = ({ params }) => {
  return <Checkout plan="Gold" params={params} />;
};

export default page;
