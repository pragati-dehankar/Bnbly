"use client"

import React from 'react'
import ListingCards from './listings-card'
import { deleteProperty } from '../actions/deleteProperties'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function PropertyBox({each}) {
const router=useRouter()
    const handleDelete=async(e)=>{
        e.preventDefault()
       const res= await deleteProperty(each.id)
       if(res.ok){
        toast({
            title:"Property deleted"
        })
        router.refresh()
       }
    }
  return (
    <ListingCards
               listing={each}
               showSecondaryBtn
               secondaryBtnLabel={"Delete this property"}
               onAction={handleDelete}
   />
  )
}
