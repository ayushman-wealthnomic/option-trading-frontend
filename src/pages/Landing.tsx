import React from 'react';
import Footer from '@/components/Landing/Footer';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import StockReportsSection from '@/components/Landing/StockReportsSection';
import AnalysisSection from '@/components/Landing/AnalysisSection';
import PortfolioSection from '@/components/Landing/PortfolioSection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import HeroSection from '@/components/Landing/HeroSection';
import Header from '@/components/Landing/Header';


// Main App Component
const Landing: React.FC = () => {
    return (
        <div className="font-sans bg-gray-50 text-gray-800">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <PortfolioSection />
                <AnalysisSection />
                <StockReportsSection />
                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;