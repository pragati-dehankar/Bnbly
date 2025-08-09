"use client"
import useFavourites from '@/hooks/use-favourite'
import { cn } from '@/lib/utils'
import { Bookmark } from 'lucide-react'
import React from 'react'

export default function Favourite({listingId,user,className,props}) {
  

    const {isFavourite,toggleFavourite}=useFavourites({listingId:listingId,user:user})
    const color=isFavourite?'pink':'white'

  return (
    <div onClick={toggleFavourite} className={cn('classname of my own', className)}>
       <svg
    width="40px"
    height="40px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
    {...props}
    style={{
        color:color
    }}
  >
    <path fill="currentColor" d="M12 2c0 0-3 0-4 3-1-3-4-3-4-3-2.2 0-4 1.8-4 4 0 4.1 8 9 8 9s8-5 8-9c0-2.2-1.8-4-4-4z"></path>
  </svg>
    </div>
  )
}
