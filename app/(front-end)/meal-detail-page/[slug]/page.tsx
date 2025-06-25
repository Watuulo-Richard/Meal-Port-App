import MealDetail from '@/components/mealdetail'
import { fetchSingleMeal } from '@/fetch/actions'
import React from 'react'

export default async function page({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params
  const singleDetailedMeal = await fetchSingleMeal(slug)
  return (
    <>
      <MealDetail singleDetailedMeal={singleDetailedMeal} slug={slug}/>
    </>
  )
}
