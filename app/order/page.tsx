import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import OrderForm from "@/components/OrderForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start your project",
  description:
    "Tell us what you are building. We scope every project in a free consultation and reply within one business day.",
  alternates: {
    canonical: `${SITE.url}/order`,
  },
};

export default function OrderPage() {
  return (
    <>
      <Nav />
      <OrderForm />
      <Footer />
    </>
  );
}
