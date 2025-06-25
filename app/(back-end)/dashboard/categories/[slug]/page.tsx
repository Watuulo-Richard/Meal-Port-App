import CategoryForm from '@/components/backend/categoryForm';
import { fetchSingleCategory } from '@/fetch/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const singleCategory = await fetchSingleCategory(slug);
  // console.log(singleCategory, 'mpweedde');
  if (!singleCategory) {
    return <div className="">loading...</div>;
  }
  return (
    <>
      <CategoryForm singleCategory={singleCategory} />
    </>
  );
}
