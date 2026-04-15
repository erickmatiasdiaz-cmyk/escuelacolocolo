import PublicLayout from '@/components/public/PublicLayout';
import HeroSection from '@/components/public/HeroSection';
import FeaturesSection from '@/components/public/FeaturesSection';
import CategoriasPreview from '@/components/public/CategoriasPreview';
import NoticiasRecientes from '@/components/public/NoticiasRecientes';
import CTASection from '@/components/public/CTASection';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <CategoriasPreview />
      <NoticiasRecientes />
      <CTASection />
    </PublicLayout>
  );
}
