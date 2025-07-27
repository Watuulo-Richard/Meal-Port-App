import MealsPage from '@/components/frontend/meals-page'
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <MealsPage session={session}/>
    </>
  )
}
