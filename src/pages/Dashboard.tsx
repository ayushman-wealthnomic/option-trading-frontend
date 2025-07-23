import { MarketHeader } from "@/components/MarketHeader";
import { ResizableLayout } from "@/components/ResizableLayout";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Meta {
    dayOpen: number;
    spot: number;
    atm_iv: number;
    fut_price: number;
}

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2021, 0, 1));
    const [selectedTime, setSelectedTime] = useState('09:15:00');
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const { theme } = useTheme();
    const [meta, setMeta] = useState<Meta>({
        dayOpen: 0,
        spot: 0,
        atm_iv: 0,
        fut_price: 0
    });

    const authToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token;
    }
    useEffect(() => {
        document.title = 'Option Trading Platform';

        const checkAuth = async () => {
            console.log("Checking authentication status...");
            console.log("Auth Token:", await authToken());

            if (await authToken() === undefined) {
                toast.error('You are not logged in. Please login to continue.');
                window.location.href = '/login';
            }
        }

        checkAuth();
    }, [])
    return (
        <div className={`min-h-screen w-screen ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
            <MarketHeader meta={meta} isDisable={isDisable} setIsDisable={setIsDisable} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            <div className="w-full max-w-none">
                <ResizableLayout isDisable={isDisable} setIsDisable={setIsDisable} setMeta={setMeta} theme={theme} date={selectedDate} time={selectedTime} meta={meta} />
            </div>
        </div>
    );
};

export default Dashboard;