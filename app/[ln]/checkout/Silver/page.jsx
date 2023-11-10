import Checkout from "@/components/checkout/checkout";

const page = ({ params }) => {
  return <Checkout plan="Silver" params={params} />;
};

export default page;
