import Hero from "@/components/home/Hero";
import IntroMarquee from "@/components/home/IntroMarquee";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedWork from "@/components/home/FeaturedWork";
import VoiceShowcase from "@/components/home/VoiceShowcase";
import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";
import AboutPreview from "@/components/home/AboutPreview";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroMarquee />
      <ServicesPreview />
      <FeaturedWork />
      <VoiceShowcase />
      <Industries />
      <Testimonials />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
