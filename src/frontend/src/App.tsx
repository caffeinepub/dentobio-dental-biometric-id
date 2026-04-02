import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DemoInterface from "./components/DemoInterface";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import RequestAccess from "./components/RequestAccess";
import TechnologySection from "./components/TechnologySection";
import UseCases from "./components/UseCases";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <TechnologySection />
          <DemoInterface />
          <UseCases />
          <RequestAccess />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
