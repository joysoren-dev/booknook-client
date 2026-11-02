import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from '@/components/CategoryShowcase';
import FeaturedBooks from "@/components/FeaturedBooks";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryShowcase />
      <FeaturedBooks />
    </div>
  );
}
