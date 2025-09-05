"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
    id: string;
    email: string;
    name: string;
};

const Navigation = () => {
    const [, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="sticky top-0 backdrop-blur-md bg-black bg-opacity-60 border-b border-gray-900 border-opacity-5 z-40">
            <div className="mx-auto px-10 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center justify-center space-x-3">
                    <div className="text-black text-3xl font-semibold tracking-wide">
                        <span className="text-white">WEALTH</span>
                        <span className="text-white">NOMICS</span>
                    </div>
                    <img src="./logo.png" alt="Logo" className="w-[60px] h-[30px]" />
                </div>

                {/* Nav links */}
                <nav className="flex gap-5 items-center">
                    <a href="#ideas" className="text-white text-xl">Ideas</a>
                    <a href="#investor-clone" className="text-white text-xl">Investor Clone</a>
                    <a href="#features" className="text-white text-xl">Features</a>
                    <a href="#valuation" className="text-white text-xl">Valuation</a>
                    <a href="/team" className="text-white text-xl">Team</a>
                </nav>

                {/* Auth / Profile section */}
                <div>
                    {loading ? (
                        // Placeholder while checking auth
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
                            {/* <Button className="font-medium" variant="ghost" onClick={handleLogout}>
                                Logout
                            </Button> */}
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <a href="/login" className="text-white font-medium text-xl underline">Login</a>
                            {/* <Button className="font-medium text-lg" href="/login" variant="ghost">
                                Sign in
                            </Button> */}
                            <a href="/signup" className="text-white font-medium text-xl underline">Signup</a>
                            {/* <Button className="font-medium text-lg" href="/signup">
                                Start Free
                            </Button> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
