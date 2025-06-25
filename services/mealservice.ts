import { createMealAction, fetchMeals, fetchSingleMeal, updateMealAction } from "@/fetch/actions"
import { MealTypes } from "@/schema/schema"
import { CreateMealTypes, ReactQueryMealProduct, UpdateMealTypes } from "@/types/types"

type UseMealState = {
    handleGetAllMealsService: () => Promise<ReactQueryMealProduct[]>,
    handleGetSingleMealService: (slug: string) => Promise<ReactQueryMealProduct>,
    handleCreateMealService: (data: MealTypes) => void,
    handleUpdateMealService: ( data: Partial<UpdateMealTypes>, slug: string) => void
}

export const handleMeal:UseMealState = {
    
    async handleCreateMealService(data:MealTypes) {
        const createMeal = await createMealAction(data)
        // console.log(createMeal, "Meal Created Successfully👍🏾");
        return createMeal as CreateMealTypes
    },
    async handleGetAllMealsService() {
        const getMeal = await fetchMeals()
        // console.log(getMeal.data, "Meals Fetched Successfully👍🏾");
        return getMeal.data as ReactQueryMealProduct[]
    },
    async handleGetSingleMealService(slug) {
        const getSingleMeal = await fetchSingleMeal(slug)
        // console.log(getSingleMeal.data, "Meal Fetched Successfully👍🏾");
        return getSingleMeal.data as ReactQueryMealProduct
    },
    async handleUpdateMealService(slug, data) {
        const updateMeal = await updateMealAction(data, slug)
        return updateMeal as UpdateMealTypes
    }
}