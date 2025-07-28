// src/components/SEO/SEOHead.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
    canonical?: string;
    type?: string;
    image?: string;
}

const SEOHead: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    type = 'website',
    image = '/og-image.jpg'
}) => {
    const siteUrl = 'https://www.wealthnomic.com';
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:site_name" content="Wealthnomic" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Wealthnomic" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Structured Data for Financial Tools */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": title,
                    "description": description,
                    "url": fullCanonical,
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "INR"
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Wealthnomic"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEOHead;