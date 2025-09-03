
const Footer = () => {
    const footerSections = [
        {
            title: "Product",
            links: ["Features", "Plans", "Screener"]
        },
        {
            title: "Company",
            links: ["About Us", "Blog", "Contact"]
        },
        {
            title: "Legal",
            links: ["Terms", "Privacy"]
        }
    ];

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-bold">WEALTHNOMICS</h4>
                        <p className="mt-4 text-gray-400">AI-powered investing for the modern era.</p>
                    </div>
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h5 className="font-semibold tracking-wide uppercase">{section.title}</h5>
                            <ul className="mt-4 space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; 2025 Wealthnomics. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer