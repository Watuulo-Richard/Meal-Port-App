import CategoriesTable from '@/components/backend/categories-table'
import MealsTable from '@/components/backend/meals-table'
import React from 'react'

export default async function page({params}:{params:Promise<{slug:string}>}) {
  const { slug } = await params
  return (
    <>
      <CategoriesTable title='Categories' slug = {slug} />
    </>
  )
}
