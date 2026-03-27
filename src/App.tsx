import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Configurator from "./pages/Configurator";
import Community from "./pages/Community";
import Print from "./pages/Print";




function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <Header />

        <Routes>
          <Route path="/" element={<Configurator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;