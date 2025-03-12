import Footer from "@/components/Footer";
import PricingComponent from "@/components/homepage/Pricing";
import Benefits from "@/components/pricing/Benefits";
import FAQs from "@/components/pricing/FAQs";
import Hero from "@/components/pricing/Hero";

function Pricing() {
  return (
    <main>
      <Hero />
      <PricingComponent subtext="Everything you need to become the best speaker you can be is right here" />
      <Benefits />
      <FAQs />
      <Footer />
    </main>
  );
}

export default Pricing;
