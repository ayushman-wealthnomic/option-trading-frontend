import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/useTheme";
import Home from "./pages/Index";
import { LoginPage } from "./components/AuthComponents/LoginPage";
import { SignupPage } from "./components/AuthComponents/SignupPage";
import { UserActivityHeatmap } from "./components/HeatMap";
import { AuthProvider } from "./components/AuthComponents/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserActivityHeatmap />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;