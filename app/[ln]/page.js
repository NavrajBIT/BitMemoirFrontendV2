import Home from "@/components/home/home";
import NotFound from "@/components/subcomponents/errorPages/notFound";

export default function App({ params }) {
  const ln = params?.ln;

  if (ln !== "en" && (ln !== "es") & (ln !== "ar")) return <NotFound />;

  return (
    <>
      <Home params={params} />
    </>
  );
}
