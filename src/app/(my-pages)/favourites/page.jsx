import { getFavouriteListings } from '@/app/actions/favourites'
import { getUser } from '@/app/actions/getUser'
import EmptyPage from '@/app/components/emptyPage'
import ListingCards from '@/app/components/listings-card'
import { getAuthSession } from '@/utils/auth'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Favourite() {
    const user=await getUser()
    if(!user) notFound()

    const {data:favourites}=await  getFavouriteListings()
    if(favourites.length==0) return <EmptyPage title="No favourites yet" linkText={"Add a listing to favourites"}/>
  return (
    <div className='p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-5 '>
        {favourites.map(each=>(
            <ListingCards
            listing={each}
            user={user}
            />
        ))}
    </div>
  )
}
