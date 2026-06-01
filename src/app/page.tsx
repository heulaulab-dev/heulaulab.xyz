import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Features } from "@/components/features";
import { Manifesto } from "@/components/manifesto";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Work />
      <Features />
      <MarqueeStrip />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  );
}