import React, { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight, Linkedin, ChevronRight } from "lucide-react";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        console.log("Subscribe with email:", email);
        setEmail("");
    };

    const linkedInposts = [
        { title: "What Really Causes Inflation?", link: "https://www.linkedin.com/posts/wealthnomics-ai_what-really-causes-inflation-inflation-didn-activity-7369708230488281091--_Bo" }
    ];

    return (
        <footer className={`bg-black text-white py-16 px-6 ${className} z-50`}>
            <div className="max-w-7xl mx-auto z-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 z-50">
                    {/* About */}
                    <div className="z-50">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-[#6C7CFF] rounded-full flex items-center justify-center mr-3">
                                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                            </div>
                            <h3 className="text-lg font-semibold">About</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <MapPin className="text-[#6C7CFF] mt-1 mr-3 flex-shrink-0" size={16} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    30 N Gould St, Ste R,
                                    <br />
                                    Sheridan, Wyoming 82801,
                                    <br />
                                    USA
                                </p>
                            </div>

                            <div className="flex items-center">
                                <Phone className="text-[#6C7CFF] mr-3 flex-shrink-0" size={16} />
                                <a
                                    href="tel:+23923829210"
                                    className="text-gray-300 text-sm hover:text-white transition-colors"
                                >
                                    +91 8867940340
                                </a>
                            </div>

                            <div className="flex items-center">
                                <Mail className="text-[#6C7CFF] mr-3 flex-shrink-0" size={16} />
                                <a
                                    href="mailto:info@yourdomain.com"
                                    className="text-gray-300 text-sm hover:text-white transition-colors"
                                >
                                    ayushman@wealhnomics.com
                                </a>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="
      w-full
      px-3 py-2
      sm:px-4 sm:py-3
      bg-black
      border border-gray-600
      rounded-l-md
      text-white
      placeholder-gray-400
      focus:outline-none focus:border-[#6C7CFF]
    "
                                />
                                <button
                                    onClick={handleSubscribe}
                                    className="px-4 py-3 bg-[#6C7CFF] hover:bg-[#5b6efc] rounded-r-md transition-colors"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="z-50">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-[#6C7CFF] rounded-full flex items-center justify-center mr-3">
                                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                            </div>
                            <h3 className="text-lg font-semibold">Information</h3>
                        </div>

                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Help & Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-baseline space-y-10 z-50">
                        <div>
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-[#6C7CFF] rounded-full flex items-center justify-center mr-3">
                                    <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                                </div>
                                <h3 className="text-lg font-semibold">LinkedIn</h3>
                            </div>

                            <div className="flex items-center justify-baseline ml-2">
                                {
                                    linkedInposts.map((item, index) => (
                                        <a key={index} href={item.link} className="underline flex"><ChevronRight className="text-[#6C7CFF] mr-2" />{item.title}</a>
                                    ))
                                }

                            </div>

                            {/* <div className="grid grid-cols-3 gap-2">
                                {instagramImages.map((image, index) => (
                                    <div key={index} className="aspect-square bg-[#6C7CFF] rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                                        <img
                                            src={image}
                                            alt={`LinkedIn post ${index + 1}`}
                                            className="w-full h-full object-cover text-center"
                                        />
                                    </div>
                                ))}
                            </div> */}
                        </div>

                        <div>
                            <p className="text-lg font-semibold mb-3">Follow us</p>
                            <div className="flex space-x-3">
                                {/* <a
                                    href="#"
                                    className="w-10 h-10 bg-[#6C7CFF] hover:bg-pink-500 rounded-full flex items-center font-light justify-center transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={18} />
                                </a> */}
                                <a
                                    href="https://x.com/wealthnomic"
                                    className="w-10 h-10 bg-[#6C7CFF] hover:bg-[#5b6efc] rounded-full flex items-center justify-center transition-colors"
                                    aria-label="X (Twitter)"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/wealthnomics-ai/posts/?feedView=all"
                                    className="w-10 h-10 bg-[#6C7CFF] hover:bg-[#5b6efc] rounded-full flex items-center justify-center transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div >

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-[#6C7CFF]" >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} WEALTHNOMICS. Smarter investing, powered by AI.
                        </p>
                    </div>
                </div>
            </div >
        </footer >
    );
};

export default Footer;
