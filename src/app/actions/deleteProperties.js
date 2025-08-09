"use server"

import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/prisma"

export async function deleteProperty(id){
    const session=await getAuthSession()
    if(!session) return {ok:false , message:"Not authorized", status:403}
    const res=await prisma.listing.deleteMany({
        where:{
            id:id,
            userId:session.user.id
        }
    })
    if(!res) return {ok:false,message:"could not find property to delete" , status:404}
    return  {ok:true, message:"deleted",status:200}
}