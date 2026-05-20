import AILandingNavbar from "../../components/ai/landing/AILandingNavbar";
import AIHeroSection from "../../components/ai/landing/AIHeroSection";
import AIChatPreview from "../../components/ai/landing/AIChatPreview";
import AIFeaturesSection from "../../components/ai/landing/AIFeaturesSection";
import AICTASection from "../../components/ai/landing/AICTASection";
import AIFooter from "../../components/ai/landing/AIFooter";

const AILandingPage = () => {
  return (
    <div className="w-full bg-white">
      <AILandingNavbar />
      <AIHeroSection />
      <AIChatPreview />
      <AIFeaturesSection />
      <AICTASection />
      <AIFooter />
    </div>
  );
};

export default AILandingPage;
