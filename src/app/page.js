import AboutUs from "@/components/Home/AboutUs/AboutUs";
import Banner from "@/components/Home/Banner/Banner";
import CTA from "@/components/Home/CTA/CTA";
import IndustryInsights from "@/components/Home/IndustryInsights/IndustryINsights";
import KeyFeatures from "@/components/Home/KeyFeatures/KeyFeatures";
import TechnologyStack from "@/components/Home/TechnologyStack/TechnologyStack";
import UseCases from "@/components/Home/UseCases/UseCases";
import WhatWeDo from "@/components/Home/WhatWeDo/WhatWeDo";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <WhatWeDo />
      <AboutUs />
      <KeyFeatures />
      <UseCases />
      <TechnologyStack />
      <CTA />
      <Footer />
    </div>
  );
}
