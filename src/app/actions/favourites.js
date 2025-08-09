"use server"

import { prisma } from "@/utils/prisma"
import { getUser } from "./getUser"

export async function getFavouriteListings(){
  const user=await getUser()
  if(!user) return {ok:false,message:"Not auth",status:403}

    try {
      const favouriteListings=await prisma.listing.findMany({
     where: {
        id:{
          in:[...(user.favouriteIds) || []]
        }
      }
    })
    return {ok:true,data:favouriteListings,status:200}
    } catch (error) {
      return {ok:false,message:"could not set",status:500}
    }
}

export async function setFavourite(id){
  const user=await getUser()
  if(!user) return {ok:false,message:"Not auth",status:403}

  if(!id || typeof id!=='string'){
    return {ok:false,message:"Id mismatch", status:404}
  }

  let favouriteIds=[...(user.favouriteIds) || []]
  favouriteIds.push(id)

  try {
    await prisma.user.update({
        where:{id:user.id},
        data:{
            favouriteIds
        }
    })
    return {ok:true,message:"updated"}
  } catch (error) {
    return {ok:false,message:"could not set",status:500}
  }
}

export async function deleteFavourite(id){
  const user=await getUser()
  if(!user) return {ok:false,message:"Not auth",status:403}
  if(!id || typeof id!=='string'){
    return {ok:false,message:"Id mismatch", status:404}
  }
  let favouriteIds=[...(user.favouriteIds) || []]
  favouriteIds=favouriteIds.filter((each)=>each !== id)

   try {
    await prisma.user.update({
      where:{id:user.id},
      data:{
        favouriteIds
      }
    })
    return {ok:true,message:"deleted"}
   } catch (error) {
    return {ok:false,message:"could not set",status:500}
   }
}