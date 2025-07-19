import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center w-screen">
      <header className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">WEALTHNOMIC</h1>
          <img src="./logo-black.png" alt="Wealthnomic Bear Logo" className="w-[79px] h-[43px]" />
        </div>
        <button
          className="text-lg font-medium hover:underline"
          onClick={() => { navigate('/dashboard'); }}
        >
          Signup/ Login
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-16 pb-24 relative w-full">
        <div className="flex items-center space-x-2 px-6 py-3 rounded-full w-4/5 max-w-lg mb-20 relative">
          <span className="text-xl text-slate-500">Made with</span>
          <img src="./heart.png" alt="Wealthnomic Bear Logo" className="w-[56px] h-[56px]" />
          <span className="text-xl text-slate-500">for all investors and traders ...</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-4 w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <img src="./fundamental.png" alt="Fundamental Logo" className='w-[88px] h-[88px]' />
            <span className="mt-2 text-lg font-medium">Fundamental</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="./options.png" alt="Options Logo" className='w-[88px] h-[88px]' />
            <span className="mt-2 text-lg font-medium">Options</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="./technical.png" alt="Technicals Logo" className='w-[88px] h-[88px]' />
            <span className="mt-2 text-lg font-medium">Technicals</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="./indian-market.png" alt="Indian Markets Logo" className='w-[88px] h-[88px]' />
            <span className="mt-2 text-lg font-medium">Indian Markets</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="./global-market.png" alt="Global Markets Logo" className='w-[88px] h-[88px]' />
            <span className="mt-2 text-lg font-medium">Global Markets</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;