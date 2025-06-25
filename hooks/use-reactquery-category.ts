// app/hooks/useContacts.ts
'use client';

import { CategoryFormData } from '@/schema/schema';
import { handleCategory } from '@/services/categoryservice';
import { UpdateCategoryTypes } from '@/types/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCategories() {
  const queryClient = useQueryClient();
  // Query for fetching all contacts
  const categoriesQuery = useQuery({
    queryKey: ['allCategories'],
    queryFn: () => {
      const categoryData = handleCategory.handleGetAll();
      console.log(categoryData);
      return categoryData;
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
      return handleCategory.createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['createCategories'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Update category mutation
    const updateCategoryMutation = useMutation({
      mutationFn: async ({ slug, data }: { slug: string; data: Partial<UpdateCategoryTypes> }) => {
        return handleCategory.handleUpdateCategory(data, slug)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['updateCategory'] });
      },
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
    allCategories: categoriesQuery.data ?? [],
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,

    // Mutations
    createCategories: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    // deleteContact: deleteContactMutation.mutate,

    // Mutation states
    // isCreating: createContactMutation.isPending,
    // isUpdating: updateContactMutation.isPending,
    // isDeleting: deleteContactMutation.isPending,
  };
}

// Hook for fetching a single category
export function useSingleCategory(slug: string) {
  const queryClient = useQueryClient();
  const getSingleCategoryQuery = useQuery({
    queryKey: ['getSingleCategory', slug],
    queryFn: () => handleCategory.handleGetSingleCategory(slug),
    select: (response) => ({
      getSingleCategory: response,
      error: response,
    }),
  });
  return {
    getSingleCategory: getSingleCategoryQuery.data?.getSingleCategory,
    error: getSingleCategoryQuery.error || getSingleCategoryQuery.data?.error,
    isLoading: getSingleCategoryQuery.isLoading,
  };
}
