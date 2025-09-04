// src/components/ProtectedRoute.tsx
import type { ReactNode } from 'react'; // From react-router-dom for redirection
import { useAuth } from './AuthComponents/AuthContext'; // Our custom hook to get auth state
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
    children: ReactNode; // This will be the actual component (e.g., <Dashboard />)
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoading } = useAuth(); // Get auth state and loading status

    // 1. Show a loading state while we're checking authentication (e.g., fetching session from Supabase)
    if (isLoading) {
        return <div className="flex justify-center items-center h-full">
            <Loader className={`w-6 h-6 animate-spin text-black`} />
        </div> // You can use a spinner here
    }

    // 3. If loading is complete AND there IS a user (i.e., authenticated)
    // Render the actual protected content (Dashboard, UserActivityHeatmap, etc.)
    return <>{children}</>;
};