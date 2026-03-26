import Header from "./components/Header"
import Footer from "./components/Footer"
import BaseSelection from "./components/BaseSelection"
import SummaryBar from "./components/SummaryBar"
import IngredientSection from "./components/IngredientSection"


function App() {

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <BaseSelection />
      <SummaryBar />
      <IngredientSection />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4" />
      <Footer />
    </div>
  )
}

export default App