import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import DoctorConsult from "./pages/DoctorConsult";
import Prescriptions from "./pages/Prescriptions";
import Appointment from "./pages/Appointment";
import DosageTracker from "./pages/DosageTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/symptom" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
              <Route path="/consult" element={<ProtectedRoute><DoctorConsult /></ProtectedRoute>} />
              <Route path="/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
              <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
              <Route path="/dosage" element={<ProtectedRoute><DosageTracker /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
