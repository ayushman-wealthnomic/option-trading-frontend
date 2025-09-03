import Button from "./Button";

// const theme = {
//     colors: {
//         bgTop: '#EAF0FF',
//         bgMid: '#F6ECF3',
//         bgBottom: '#FFF5EC',
//         ink: '#0E1320',
//         inkSoft: '#30364A',
//         muted: '#6E778A',
//         brand: '#6C7CFF',
//         brand2: '#7C4DFF',
//         cta: '#1E88E5',
//         card: '#ffffff',
//         cardDark: '#0B0E19',
//         accent: '#11C786',
//         warn: '#F59E0B',
//         danger: '#EF4444',
//         ring: 'rgba(108,124,255,.35)',
//     },
// };

const Navigation = () => {
    return (
        <div className="sticky top-0 backdrop-blur-md bg-black bg-opacity-60 border-b border-gray-900 border-opacity-5 z-40">
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                    <img src="./logo.png" alt="" className="w-[60px] h-[30px]" />
                    <div className="text-black text-3xl font-bold tracking-wide">
                        <span className="text-white">WEALTH</span><span className="text-white">NOMICS</span>
                    </div>
                </div>
                <nav className="flex gap-5 items-center">
                    <a href="#features" className="text-white text-lg">Features</a>
                    <a href="#builder" className="text-white text-lg">Portfolios</a>
                    <a href="#valuation" className="text-white text-lg">Valuation</a>
                    <a href="#ideas" className="text-white text-lg">Ideas</a>
                    <a href="#alerts" className="text-white text-lg">Alerts</a>
                    <Button href='/login' variant="ghost">Sign in</Button>
                    <Button href='/signup'>Start Free</Button>
                </nav>
            </div>
        </div>
    )
}

export default Navigation