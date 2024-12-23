import { HeroSection, BentoGrid, ProcessSteps, ServiceExplanation, ServiceShowcase, MembershipSection } from '@/components/features';
import { PageLayout } from '@/components/ui/PageLayout';

export default function Home() {
  return (
    <PageLayout maxWidth="full" noPadding>
      <HeroSection />
      <BentoGrid />
      <ServiceExplanation />
      <ProcessSteps />
      <ServiceShowcase />
      <MembershipSection />
    </PageLayout>
  );
}
