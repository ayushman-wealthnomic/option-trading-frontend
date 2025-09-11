import { useState } from 'react';

const CountryDropdown = () => {
    const [selectedCountry, setSelectedCountry] = useState('IN');
    const [isOpen, setIsOpen] = useState(false);

    const countries = [
        { code: 'IN', flagPath: '/IN.png' },
        { code: 'US', flagPath: '/US.png' },
    ];

    const handleCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setIsOpen(false);
    };

    const selectedCountryData = countries.find(country => country.code === selectedCountry);

    return (
        <div className="relative inline-block">
            {/* Dropdown Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-black text-white rounded transition-colors min-w-16"
            >
                <img
                    src={selectedCountryData?.flagPath}
                    alt={`${selectedCountry} flag`}
                    className="w-6 h-auto object-contain"
                />
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
                <div className="absolute top-full left-0 mt-1 bg-black rounded shadow-lg z-100 min-w-full">
                    <div className="py-1">
                        {countries.map((country) => (
                            <div
                                key={country.code}
                                className="flex items-center justify-center px-1 py-1 cursor-pointer transition-colors"
                                onClick={() => handleCountrySelect(country.code)}
                            >
                                <img
                                    src={country.flagPath}
                                    alt={`${country.code} flag`}
                                    className="w-6 h-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
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