import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import NewArrivals from "@/components/NewArrivals";
import HomeExtras from "@/components/HomeExtras";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroBanner />
      <CategoryShowcase />
      <NewArrivals />
      <HomeExtras />
    </div>
  );
}
