"use client"
import React from 'react'
import ListingCards from './listings-card'
import { toast } from '@/hooks/use-toast'
import { deleteReservation } from '../actions/reservation'
import { useRouter } from 'next/navigation'

export default function BookedCard({resv}) {
    const router=useRouter()
    const cancelReservation=async(e)=>{
        e.preventDefault()
     const res=await deleteReservation(resv.id)
     if(res.ok){
        toast({
            title:'deleted'
        })
        router.refresh()
     }
    }
  return (
    <div>
        <ListingCards
        reservationsData={resv}
        listing={resv.listing}
        showSecondaryBtn={true}
        secondaryBtnLabel={"Canel Booking"}
        onAction={cancelReservation}
        />
    </div>
  )
}
