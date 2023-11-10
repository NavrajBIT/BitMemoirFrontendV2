import Checkout from "@/components/checkout/checkout";

const page = ({ params }) => {
  return <Checkout plan="Platinum" params={params} />;
};

export default page;
