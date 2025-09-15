"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLocation = () => ({ pathname: "/" });

type Profile = {
    id: string;
    email: string;
    name: string;
};

const Navigation = () => {
    const location = useLocation();
    const [, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    console.log(profile);


    const isHomePage = location.pathname == "/";

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from("users")
                    .select("id, email, name")
                    .eq("id", user.id)
                    .single();

                if (!error) {
                    setProfile(data);
                } else {
                    console.error("Error fetching profile:", error);
                }
            }

            setLoading(false); // ✅ stop loading once done
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        window.location.href = "/";
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className={`sticky top-0 backdrop-blur-md bg-black bg-opacity-60 border-b border-gray-900 border-opacity-5 z-1000${isHomePage ? " " : " px-4 sm:px-10 lg:px-20"}`}>
            <div className=" sticky mx-auto px-4 sm:px-10 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center justify-center space-x-3">
                    <div className="text-black text-2xl sm:text-3xl font-semibold tracking-wide cursor-pointer" onClick={() => { navigate("/") }}>
                        <span className="text-white">WEALTH</span>
                        <span className="text-white">NOMICS</span>
                    </div>
                    <img src="/logo.png" alt="Logo" className="w-[50px] h-[25px] sm:w-[60px] sm:h-[30px]" />
                </div>

                {/* Desktop Nav links */}
                <nav className="hidden lg:flex gap-5 items-center">
                    <a href="#about_us" className="text-white text-xl">About Us</a>
                    <a href="/team" className="text-white text-xl">Team</a>
                </nav>

                {/* Desktop Auth / Profile section */}
                <div className="hidden lg:block">
                    {loading ? (
                        <div className="w-24 h-6 bg-gray-700 rounded animate-pulse" />
                    ) : profile ? (
                        <div className="flex items-center gap-3">
                            <div className="text-right text-xl">
                                <p className="text-white font-medium">{profile.name}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                                {profile.name.charAt(0)}
                            </div>
                            <div onClick={handleLogout} className="text-white font-medium text-xl underline cursor-pointer">Logout</div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <a href="/platform" className="text-white font-medium text-xl underline">Platform Table</a>
                            <a href="/login" className="text-white font-medium text-xl underline">Investor Login</a>
                            <a href="/signup" className="text-white font-medium text-xl underline">Signup</a>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="lg:hidden text-white p-2 z-50"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile menu */}
            <div className={`lg:hidden fixed inset-0 w-full bg-black bg-opacity-95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100vh',
                    width: '100vw'
                }}>
                <div className="flex flex-col p-6 space-y-6">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="text-black text-2xl sm:text-3xl font-semibold tracking-wide">
                            <span className="text-white">WEALTH</span>
                            <span className="text-white">NOMICS</span>
                        </div>
                        <img src="/logo.png" alt="Logo" className="w-[50px] h-[25px] sm:w-[60px] sm:h-[30px]" />
                    </div>
                    {/* Mobile Nav links */}
                    <nav className="flex flex-col space-y-2">
                        <a href="#ideas" className="text-white text-xl py-2 underline border-gray-700" onClick={closeMobileMenu}>
                            Ideas
                        </a>
                        <a href="#investor-clone" className="text-white text-xl py-2 underline border-gray-700" onClick={closeMobileMenu}>
                            Investor Clone
                        </a>
                        <a href="#features" className="text-white text-xl py-2 underline border-gray-700" onClick={closeMobileMenu}>
                            Features
                        </a>
                        <a href="#valuation" className="text-white text-xl py-2 underline border-gray-700" onClick={closeMobileMenu}>
                            Valuation
                        </a>
                        <a href="/team" className="text-white text-xl py-2 underline border-gray-700" onClick={closeMobileMenu}>
                            Team
                        </a>
                    </nav>

                    {/* Mobile Auth / Profile section */}
                    <div className="pt-4 border-t border-gray-700">
                        {loading ? (
                            <div className="w-24 h-6 bg-gray-700 rounded animate-pulse" />
                        ) : profile ? (
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                                        {profile.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-lg">{profile.name}</p>
                                        <p className="text-gray-400 text-sm">{profile.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-white font-medium text-xl underline text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <a href="/login" className="text-white font-medium text-xl underline" onClick={closeMobileMenu}>
                                    Login
                                </a>
                                <a href="/signup" className="text-white font-medium text-xl underline" onClick={closeMobileMenu}>
                                    Signup
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;