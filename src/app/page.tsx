import { HeroSection, BentoGrid, ProcessSteps, ServiceExplanation, ServiceShowcase } from '@/components/features';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <ProcessSteps />
      <ServiceExplanation />
      <ServiceShowcase />
    </div>
  );
}
