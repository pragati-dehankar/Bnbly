"use client"
import { deleteFavourite, setFavourite } from "@/app/actions/favourites";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


export default function useFavourites({listingId,user}){

    const router=useRouter()
    const isFavourite=useMemo(()=>{
        const list=user?.favoriteIds || []
        return list.includes(listingId)
    },[listingId,user])

    const toggleFavourites=useCallback(async()=>{
        if(!user){
         return router.push('/sign-in')
        }
        try {
            if(isFavourite){
                 const res=await deleteFavourite(listingId)
                 if(res.ok){
                    router.refresh()
                 }
            }else{
             const res= await setFavourite(listingId)
             if(res.ok){
                router.refresh()
             }
            }
        } catch (error) {
            console.error(error.message)
        }
    },[listingId,user])
    return{
        isFavourite,
        toggleFavourites
    }
}