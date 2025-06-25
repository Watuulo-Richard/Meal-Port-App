import CategoryForm from '@/components/backend/categoryForm'
import { fetchSingleCategory } from '@/fetch/actions'
import React from 'react'

export default async function page({params}:{params:Promise<{slug:string}>}) {
const { slug } = await params
    const singleCategory = await fetchSingleCategory(slug)
  return (
    <>
      <CategoryForm singleCategory={null} />
    </>
  )
}
