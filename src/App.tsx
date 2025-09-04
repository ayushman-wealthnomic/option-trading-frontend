import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Option-Trading/Dashboard";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/useTheme";
// import Home from "./pages/Index";
import { LoginPage } from "./components/AuthComponents/LoginPage";
import { SignupPage } from "./components/AuthComponents/SignupPage";
import { UserActivityHeatmap } from "./components/HeatMap";
import { AuthProvider } from "./components/AuthComponents/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import StockScreener from "./pages/Stock-Screener/Main";
import IndexPlay from "./pages/IndexPlay/Main";
import Main from "./pages/AlphaStock/Main";
import StockDashboard from "./pages/TechnicalAnalysis/StockDashboard";
import StockStorytellingDashboard from "./pages/StockStory/SingleStockDashboard";
import TechnicalDashboard from "./pages/Technical/TechnicalDashboard";
import Landing from "./pages/Landing";


const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/option-trading"
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
            <Route
              path="/stock-screener"
              element={
                <ProtectedRoute>
                  <StockScreener />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-play"
              element={
                <ProtectedRoute>
                  <IndexPlay />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alpha-stock"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="/charts"
              element={
                <div className="w-screen h-screen">
                  <ProtectedRoute>
                    <StockDashboard />
                  </ProtectedRoute>
                </div>
              }
            />
            <Route
              path="/stock-story"
              element={
                <div className="w-screen h-screen">
                  <StockStorytellingDashboard />
                </div>
              }
            />
            <Route
              path="/technical"
              element={
                <ProtectedRoute>
                  <div className="w-screen h-screen">
                    <TechnicalDashboard />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <div className="w-screen h-screen">
                  <Landing />
                </div>
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