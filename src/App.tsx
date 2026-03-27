import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Configurator from "./pages/Configurator";
import Community from "./pages/Community";
import Print from "./pages/Print";
import BowlSelection from "./components/BowlSelection";
import CenterBowl from "./components/CenterBowl";
import IngredientSection from "./components/IngredientSection";
import SummaryBar from "./components/SummaryBar";

function MainLayout() {
  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-6 items-center">
        <div className="flex justify-center">
          <BowlSelection />
        </div>

        <div className="flex justify-center items-center">
          <CenterBowl />
        </div>

        <div className="flex justify-center">
          {/* (empty right column for now, or add something later) */}
        </div>
      </div>

      <IngredientSection />
      <SummaryBar />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <Header />

        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;