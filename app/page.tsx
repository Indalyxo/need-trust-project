import NavigationMenu from "@/components/custom/navigation-menu";
import BannerCarousel from "@/components/custom/banner-carousel";
import SponserSection from "@/components/custom/sponser-section";
import { LatestNews } from "@/components/custom/latestnews";

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
      <LatestNews />
      <SponserSection />
    </main>
  );
}
