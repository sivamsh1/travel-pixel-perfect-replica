
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TravelFormProvider } from "./context/TravelFormContext";
import LocationStep from "./pages/LocationStep";
import DatesStep from "./pages/DatesStep";
import TravellersStep from "./pages/TravellersStep";
import ContactStep from "./pages/ContactStep";
import PlansStep from "./pages/PlansStep";
import AddonsStep from "./pages/AddonsStep";
import TravellersDetailsStep from "./pages/TravellersDetailsStep";
import ReviewStep from "./pages/ReviewStep";
import ComparePlans from "./pages/ComparePlans";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TravelFormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/quote" element={<LocationStep />} />
            <Route path="/dates" element={<DatesStep />} />
            <Route path="/travellers" element={<TravellersStep />} />
            <Route path="/contact" element={<ContactStep />} />
            <Route path="/plans" element={<PlansStep />} />
            <Route path="/addons" element={<AddonsStep />} />
            <Route path="/traveller-details" element={<TravellersDetailsStep />} />
            <Route path="/review" element={<ReviewStep />} />
            <Route path="/compare" element={<ComparePlans />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TravelFormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
