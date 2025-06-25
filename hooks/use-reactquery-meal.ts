// app/hooks/useContacts.ts
'use client';

import { MealTypes } from '@/schema/schema';
import { UpdateMealTypes } from '@/types/types';
import getMealsByCategory from '@/actions/products';
import { handleMeal } from '@/services/mealservice';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useMeals() {
  const queryClient = useQueryClient();
  // Query for fetching all meals
  const getAllMealsQuery = useQuery({
    queryKey: ['getAllMeals'],
    queryFn: () => {
      const fetchedMeals = handleMeal.handleGetAllMealsService();
      console.log(fetchedMeals);
      return fetchedMeals;
    },
  });

  const createMealMutation = useMutation({
    mutationFn: async (data: MealTypes) => {
      return handleMeal.handleCreateMealService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['createMeal'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Update Meal
    const updateMealMutation = useMutation({
      mutationFn: async ({ slug, data }:{ slug: string; data: Partial<UpdateMealTypes> }) => {
        // Note The Type UpdateMealTypes Come From React Query And Recall Our Ka Formula Of How Types Move
        return handleMeal.handleUpdateMealService(data, slug)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['updateMeal'] });
      },
      onError: (error) => {
        console.log(error);
      }
    });

  // Delete contact mutation
  //   const deleteContactMutation = useMutation({
  //     mutationFn: deleteContact,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['contacts'] });
  //     },
  //   });

  return {
    // Queries
    getAllMeals: getAllMealsQuery.data ?? [],
    isLoading: getAllMealsQuery.isLoading,
    error: getAllMealsQuery.error,

    // Mutations
    createMeal: createMealMutation.mutate,
    updateMeal: updateMealMutation.mutate,
    // deleteContact: deleteContactMutation.mutate,

    // Mutation states
    // isCreating: createContactMutation.isPending,
    // isUpdating: updateContactMutation.isPending,
    // isDeleting: deleteContactMutation.isPending,
  };
}

// Hook for fetching a single meal
export function useSingleMealQuery(slug: string) {
  const queryClient = useQueryClient();
  const singleMealQuery = useQuery({
    queryKey: ['singleMeal', slug],
    queryFn: () => handleMeal.handleGetSingleMealService(slug),
    select: (response) => (
      {
      singleMeal: response,
      error: response,
    }),
  });
  return {
    singleMeal: singleMealQuery.data?.singleMeal ,
    error: singleMealQuery.error || singleMealQuery.data?.error,
    isLoading: singleMealQuery.isLoading,
  };
}

export function useFetchMealsByCategory(slug: string) {
  // Query for fetching all meals by the category
  const getAllMealsByCategoryQuery = useQuery({
    queryKey: ['getMealsByCategory', slug],
    queryFn: () => {
      const fetchedMealByCategory = getMealsByCategory(slug);
      console.log(fetchedMealByCategory, 'Oh My God...');
      return fetchedMealByCategory;
    },
  });
  return {
    // Queries
    getMealsByCategory: getAllMealsByCategoryQuery.data,
    isLoading: getAllMealsByCategoryQuery.isLoading,
    error: getAllMealsByCategoryQuery.error,
  };
}