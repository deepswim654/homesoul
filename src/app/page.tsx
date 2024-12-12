import { HeroSection, BentoGrid, Showcase } from '@/components/features';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <Showcase />
    </div>
  );
}
