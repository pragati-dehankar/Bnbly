import { getReservationById } from '@/app/actions/getReservations'
import { getUser } from '@/app/actions/getUser'
import { getReservation } from '@/app/actions/reservation'
import BookedCard from '@/app/components/booked-card'
import EmptyPage from '@/app/components/emptyPage'
import { getAuthSession } from '@/utils/auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Bookings() {
    const user=await getUser()
    if(!user) notFound()
        const {data:reservations}=await getReservation()
    if(reservations.length==0){
        return <EmptyPage title="no bookings found" linkText={"book your property today"}/>
    }
  return (
    <div className='p-4 md:p-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {
            reservations.map((each,index)=>(
            <BookedCard resv={each}  />
            ))
        }
        </div> 
    </div>
  )
}
