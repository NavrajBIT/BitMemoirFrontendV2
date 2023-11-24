import "./globals.css";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/subcomponents/scripts/googleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bitmemoir: Verified Certificates and Documents over Blockchain",
  description: "Issue. Store. Verify. Retrieve.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics
        GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
