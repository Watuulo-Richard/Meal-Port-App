import { CategoryFormData } from "@/schema/schema"
import { CreateCatProps, ReactQueryCategoryTypes, UpdateCategoryTypes } from "@/types/types"
import { createCategoryAction, fetchMealCategories, fetchSingleCategory, updateCategoryAction } from "@/fetch/actions"

type UseCategoryState = {
    handleGetAll: ()=> Promise<ReactQueryCategoryTypes[]>,
    handleGetSingleCategory: (slug: string)=> Promise<ReactQueryCategoryTypes | null>,
    createCategory: (data:CategoryFormData) => void,
    handleUpdateCategory: (data: UpdateCategoryTypes, slug: string) => void
}

export const handleCategory:UseCategoryState = {
    // async handleGetAll() {
    //     const getAllCategories = await fetchMealCategories()
    //     // console.log(getAllCategories.data, "My Categories😄😄😄");
    //     return getAllCategories.data as ReactQueryCategoryTypes[]
    //     // This is where we access the real Data
    // },

    handleGetAll: async () => {
        const getAllCategories = await fetchMealCategories()
        console.log(getAllCategories.data, "My Categories😄😄😄");
        return getAllCategories.data as ReactQueryCategoryTypes[]
        // This is where we access the real Data
    },

    async handleGetSingleCategory(slug)  {
        const getSingleCategory = await fetchSingleCategory(slug)
        console.log(getSingleCategory.data, "Category Fetched Successfully👍🏾");
        return getSingleCategory.data as ReactQueryCategoryTypes
    },

    createCategory: async (data:CategoryFormData) => {
        const createACategory = await createCategoryAction(data)
        console.log(createACategory.data, "Category Created Successfully👍🏾");
        return createACategory.data as CreateCatProps
    },

    async handleUpdateCategory(slug, data) {
        const updateCategory = await updateCategoryAction(data, slug)
        console.log(updateCategory.data, "Category Updated Successfully👍🏾");
        return updateCategory.data as UpdateCategoryTypes
    }
}



