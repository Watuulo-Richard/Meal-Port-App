import MealForm from '@/components/backend/mealForm';
import { fetchSingleMeal } from '@/fetch/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const singleMeal = await fetchSingleMeal(slug);

  if (!singleMeal) {
    return <div>loading...</div>;
  }
  return (
    <>
      <MealForm singleMeal={singleMeal} />
    </>
  );
}
