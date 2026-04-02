import { useEffect, useState } from "react"
import CenterBowl from "../components/CenterBowl"
import BowlSelection from "../components/BowlSelection"
import BaseSelection from "../components/BaseSelection"
import IngredientSection from "../components/IngredientSection"
import SummaryBar from "../components/SummaryBar"
import { getBowls, getCategories, getIngredients } from "../services/api"
import type { Bowl, Category, Ingredient } from "../types"

function App() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  
  const [baseType, setBaseType] = useState<number | null>(null)
  const [selectedBowl, setSelectedBowl] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
      const bowlsData = await getBowls()
      const categoriesData = await getCategories()
      const ingredientsData = await getIngredients()

      setIngredients(ingredientsData)
      setBowls(bowlsData)
      setCategories(categoriesData)
      } catch(error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredBowls =
    baseType !== null
      ? bowls.filter(b => b.base_type_id === baseType)
      : bowls

  const filteredCategories =
    baseType !== null
      ? categories.filter(c => c.base_type_id === baseType)
      : categories

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">


      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr_256px] gap-6 items-center">
          
          <div className="flex justify-center">
            <BowlSelection 
              bowls = {filteredBowls} 
              setBowl = {setSelectedBowl} />
          </div>

          <div className="flex justify-center items-center">
            <CenterBowl
              setBaseType = {setBaseType}
              baseType = {baseType} />
          </div>

          <div className="flex justify-center">
            <BaseSelection ingredients = {ingredients} />
          </div>
        </div>
      


      <IngredientSection categories = {filteredCategories} ingredients = {ingredients} baseType = {baseType} />
      <SummaryBar />
      </main>
    </div>
  )
}

export default App