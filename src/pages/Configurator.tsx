import Header from "../components/Header"
import Footer from "../components/Footer"
import CenterBowl from "../components/CenterBowl"
import BowlSelection from "../components/BowlSelection"
import BaseSelection from "../components/BaseSelection"
import IngredientSection from "../components/IngredientSection"
import SummaryBar from "../components/SummaryBar"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr_256px] gap-6 items-center">

          <div className="flex justify-center">
            <BowlSelection />
          </div>

          <div className="flex justify-center items-center">
            <CenterBowl />
          </div>

          <div className="flex justify-center">
            <BaseSelection />
          </div>

        </div>

        <IngredientSection />
        <SummaryBar />

      </main>

      <Footer />
    </div>
  )
}

export default App