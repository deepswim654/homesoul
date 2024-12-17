import { HeroSection, BentoGrid, ProcessSteps, ServiceShowcase } from '@/components/features';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <ProcessSteps />
      <ServiceShowcase />
    </div>
  );
}
