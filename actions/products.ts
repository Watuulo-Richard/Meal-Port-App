'use server';

import { prismaClient } from '@/prisma/db';
export default async function getMealsByCategory(slug: string) {
  try {
    let meals = [];
    if (slug === 'all') {
      // Here We Are Fetching All Meals To Be There All By Default
      const allMeals = await prismaClient.mealProduct.findMany();
      meals = allMeals;
    } else {
      const singleCategory = await prismaClient.category.findUnique({
        where: {
          slug: slug,
        },
      });
      const categoryWithMeals = await prismaClient.mealProduct.findMany({
        where: {
          categoryId: singleCategory?.id,
        },
      });
      meals = categoryWithMeals;
    }

    return meals;
  } catch (error) {
    console.log(error);
    return [];
  }
}
