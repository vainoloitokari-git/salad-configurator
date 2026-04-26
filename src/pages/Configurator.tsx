import { useEffect, useState } from "react"
import CenterBowl from "../components/CenterBowl"
import BowlSelection from "../components/BowlSelection"
import BaseSelection from "../components/BaseSelection"
import IngredientSection from "../components/IngredientSection"
import SummaryBar from "../components/SummaryBar"
import SaveRecipeModal from "../components/SaveRecipeModal"

import { 
  getBowls, 
  getCategories, 
  getIngredients, 
  getBaseIngredients 
} from "../services/api"

import { useAuthStore } from "../store/useAuthStore"

import type { Bowl, Category, Ingredient } from "../types"

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([])
  const [baseType, setBaseType] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const token = useAuthStore((s) => s.token)

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const bowlsData = await getBowls()
        const categoriesData = await getCategories()
        const ingredientsData = await getIngredients()
        const baseIngredientsData = await getBaseIngredients()

        setIngredients(ingredientsData)
        setBowls(bowlsData)
        setCategories(categoriesData)
        setBaseIngredients(baseIngredientsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (baseType === null) return

    const fetchCategoriesByType = async () => {
      try {
        const categoriesData = await getCategories(baseType)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories by type:", error)
      }
    }

    fetchCategoriesByType()
  }, [baseType])

  useEffect(() => {
    if (baseType === null) return

    const fetchBowlsByType = async () => {
      try {
        const bowlsData = await getBowls(baseType)
        setBowls(bowlsData)
      } catch (error) {
        console.error("Error fetching bowls by type:", error)
      }
    }

    fetchBowlsByType()
  }, [baseType])

  const filteredCategories =
    baseType !== null
      ? categories.filter(c => c.base_type_id === baseType)
      : categories

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">

        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr_256px] gap-6 items-center">
          
          <div className="flex justify-center">
            <BowlSelection bowls={bowls} />
          </div>

          <div className="flex justify-center items-center">
            <CenterBowl
              setBaseType={setBaseType}
              baseType={baseType}
              onSaveClick={() => setIsSaveModalOpen(true)}
            />
          </div>

          <div className="flex justify-center">
            <BaseSelection ingredients={baseIngredients} />
          </div>
        </div>

        <IngredientSection 
          categories={filteredCategories} 
          ingredients={ingredients} 
          baseType={baseType}
        />

        <SummaryBar />
      </main>

      <SaveRecipeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        token={token ?? ''}
      />
    </div>
  )
}

export default Configurator
