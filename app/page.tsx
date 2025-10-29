import NavigationMenu from "@/components/custom/navigation-menu";
import BannerCarousel from "@/components/custom/banner-carousel";
import SponserSection from "@/components/custom/sponser-section";
import ImpactSection from "@/components/custom/impact-section";

export default function Home() {


  return (
    <main
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NavigationMenu />
      <BannerCarousel />
      <ImpactSection />
      <SponserSection />
    </main>
  );
}
