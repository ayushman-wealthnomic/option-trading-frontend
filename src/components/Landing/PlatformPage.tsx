import React from 'react';
import Navigation from './Navigation';

const InvestmentPlatform: React.FC = () => {



    return (<>
        <Navigation />
        <div className="bg-black text-white min-h-screen flex items-center justify-center gap-52">
            <div className='flex flex-col justify-center items-center gap-8'>
                <img src="/dice 1.png" alt="Logo" />
                <p className='font-semibold text-2xl'>AI Clone</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-8'>
                <img src="polygon_1.png" alt="Logo" />
                <p className='font-semibold text-2xl'>Market Watch</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <img src="/icon-park-outline_virtual-reality-glasses.png" alt="Logo" />
                <p className='font-semibold text-2xl'>Portfolio Tracking</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <img src="/entypo_back-in-time.png" alt="Logo" />
                <p className='font-semibold text-2xl'>Backfest</p>
            </div>
        </div>
    </>
    );
};

export default InvestmentPlatform;