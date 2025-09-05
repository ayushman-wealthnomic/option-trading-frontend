
import HeroSection from '@/components/Landing/HeroSection';
import Navigation from '@/components/Landing/Navigation';
import SocialProofSection from '@/components/Landing/SocialProofSection';

import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/lib/seoConfig';
import IdeaSection from '@/components/Landing/IdeaSection';
import InvestorClone from '@/components/Landing/InvestorClone';
import OptionsSection from '@/components/Landing/OptionsSection';
import WatchlistSection from '@/components/Landing/WatchlistSection';


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

    useSEO({
        title: seoConfig.home.title,
        description: seoConfig.home.description,
        keywords: seoConfig.home.keywords,
        canonical: seoConfig.home.canonical,
        image: '/og-home.jpg'
    });
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
                <section className='bg-black'>
                    <HeroSection />
                </section>
                <section id='ideas'>
                    <IdeaSection />
                </section>
                <section id='investor-clone'>
                    <InvestorClone />
                </section>
                <section id='watchlist'>
                    <WatchlistSection />
                </section>
                <section id='options'>
                    <OptionsSection />
                </section>
                {/* <FeaturesSection />
                <BuilderSection />
                <ValuationSection />
                <IdeasSection />
                <AlertsSection />
                <SocialProofSection /> */}
                <SocialProofSection />
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