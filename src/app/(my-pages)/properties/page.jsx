import EmptyPage from '@/app/components/emptyPage'
import ListingCards from '@/app/components/listings-card'
import PropertyBox from '@/app/components/propertyBox'
import { getAuthSession } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Properties() {
    const session=await getAuthSession()
    if(!session){
        notFound()
    }
    const propertiesList=await prisma.listing.findMany({
        where:{
            userId:session.user.id
        }
    })
    if(!propertiesList){
        return <EmptyPage title="No properties added so far" linkText="Add yours today" link='/become-a-host'/>
    }
   
  return (
    <div className='p-4 md:p-8 space-y-5'>
        <h1 className='text-3xl font-semibold '>Your properties</h1>
        <div className='grid  grid-cols-2  md:grid-cols-4 gap-5'>
            {propertiesList.map((each)=>(
              <PropertyBox each={each}/>
            ))}
        </div>
    </div>
  )
}
