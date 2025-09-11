import { useState } from 'react';

const CountryDropdown = () => {
    const [selectedCountry, setSelectedCountry] = useState('IN');
    const [isOpen, setIsOpen] = useState(false);

    const countries = [
        { code: 'IN', name: 'India', flag: '🇮🇳' },
        { code: 'US', name: 'United States', flag: '🇺🇸' }
    ];

    const handleCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setIsOpen(false);
    };

    const selectedCountryData = countries.find(country => country.code === selectedCountry);

    return (
        <div className="relative">
            {/* Dropdown Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center gap-1 px-3 py-1 bg-black min-w-10"
            >
                <span className="text-lg">{selectedCountryData?.flag}</span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute flex flex-col justify-center items-center max-w-12 top-full left-0 right-0 mt-1 bg-black shadow-lg z-50">
                    {countries.map((country) => (
                        <div
                            key={country.code}
                            className="cursor-pointer transition-colors"
                            onClick={() => handleCountrySelect(country.code)}
                        >
                            <span className="text-lg">{country.flag}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default CountryDropdown;