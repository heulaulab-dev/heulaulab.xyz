import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
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
      <MarqueeStrip />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  );
}