import React from 'react';

interface ProConItem {
    text: string;
}

interface ProsConsProps {
    pros?: ProConItem[];
    cons?: ProConItem[];
    showDisclaimer?: boolean;
    disclaimerText?: string;
}

const ProsConsComponent: React.FC<ProsConsProps> = ({
    pros = [
        { text: "Company is almost debt free." },
        { text: "Company has a good return on equity (ROE) track record: 3 Years ROE 27.8%" },
        { text: "Company has been maintaining a healthy dividend payout of 99.3%" }
    ],
    cons = [
        { text: "Stock is trading at 9.49 times its book value" },
        { text: "The company has delivered a poor sales growth of 7.09% over past five years." }
    ],
    // showDisclaimer = true,
    // disclaimerText = "The pros and cons are machine generated."
}) => {
    return (
        <div className="bg-balck p-6 rounded-lg max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pros Section */}
                <div className="bg-black rounded-lg border border-green-500/30">
                    <div className="bg-green-900/30 px-4 py-3 border-b border-green-500/30">
                        <h3 className="text-green-500 font-semibold text-sm uppercase tracking-wider">
                            PROS
                        </h3>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                            {pros.map((pro, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm leading-relaxed">
                                        {pro.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Cons Section */}
                <div className="bg-black rounded-lg border border-red-500/30">
                    <div className="bg-red-900/30 px-4 py-3 border-b">
                        <h3 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                            CONS
                        </h3>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                            {cons.map((con, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm leading-relaxed">
                                        {con.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            {/* {showDisclaimer && (
                <div className="mt-6 flex items-center text-gray-500 text-xs">
                    <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{disclaimerText}</span>
                </div>
            )} */}
        </div>
    );
};

export default ProsConsComponent;