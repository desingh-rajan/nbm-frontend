import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import WorksGrid from '@/components/portfolio/WorksGrid';
import CategoryStrip from '@/components/portfolio/CategoryStrip';
import AboutSection from '@/components/portfolio/AboutSection';
import ValuesQuadrant from '@/components/portfolio/ValuesQuadrant';
import SoftwaresSection from '@/components/portfolio/SoftwaresSection';
import ClientsSection from '@/components/portfolio/ClientsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import LandingPageWrapper from '@/components/LandingPageWrapper';

export default function Home() {
  return (
    <LandingPageWrapper>
      <SiteHeader />
      <main className="space-y-28 md:space-y-40 bg-portfolio-subtle">
        <PortfolioHero />
        <WorksGrid />
        <CategoryStrip id="motion-graphics" title="MOTION GRAPHICS" />
        <CategoryStrip id="animations" title="ANIMATIONS" />
        <AboutSection />
        <ValuesQuadrant />
        <SoftwaresSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </LandingPageWrapper>
  );
}
