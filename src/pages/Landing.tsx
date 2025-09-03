import AlertsSection from '@/components/Landing/AlertsSection';
import BuilderSection from '@/components/Landing/BuilderSection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import Footer from '@/components/Landing/Footer';
import HeroSection from '@/components/Landing/HeroSection';
import IdeasSection from '@/components/Landing/IdeasSection';
import Navigation from '@/components/Landing/Navigation';
import SocialProofSection from '@/components/Landing/SocialProofSection';
import ValuationSection from '@/components/Landing/ValuationSection';

const theme = {
    colors: {
        bgTop: '#EAF0FF',
        bgMid: '#F6ECF3',
        bgBottom: '#FFF5EC',
        ink: '#0E1320',
        inkSoft: '#30364A',
        muted: '#6E778A',
        brand: '#6C7CFF',
        brand2: '#7C4DFF',
        cta: '#1E88E5',
        card: '#ffffff',
        cardDark: '#0B0E19',
        accent: '#11C786',
        warn: '#F59E0B',
        danger: '#EF4444',
        ring: 'rgba(108,124,255,.35)',
    },
};

const Landing = () => {
    return (
        <div className="min-h-screen bg-white relative">
            {/* Background gradients */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(60% 40% at 50% 0%, ${theme.colors.bgTop}, transparent 60%),
            radial-gradient(60% 50% at 50% 38%, ${theme.colors.bgMid}, transparent 60%),
            radial-gradient(80% 50% at 50% 80%, ${theme.colors.bgBottom}, transparent 60%)
          `,
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                <Navigation />
                <HeroSection />
                <FeaturesSection />
                <BuilderSection />
                <ValuationSection />
                <IdeasSection />
                <AlertsSection />
                <SocialProofSection />
                <Footer />
            </div>

            {/* Custom styles for shimmer animation */}
            {/* <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style> */}
        </div>
    );
}

export default Landing;