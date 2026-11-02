import HeroBanner from "@/components/HeroBanner";
import FeaturedBooks from "@/components/FeaturedBooks";
import CategoryShowcase from '@/components/CategoryShowcase';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryShowcase />
      <FeaturedBooks />
    </div>
  );
}
