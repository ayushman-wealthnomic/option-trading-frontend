

const Header = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900">
                    WEALTHNOMICS
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-gray-600 hover:text-blue-600">Features</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Plans</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="hidden sm:block bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                        Sign In
                    </button>
                    <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Start for free
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header