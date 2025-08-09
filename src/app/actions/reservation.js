"use server"

import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/prisma"
import { getUser } from "./getUser"

export async function getReservation(){
    const session=await getAuthSession()

    if(!session || !session.user){
        return {ok:false, message:"Not permitted",status:403}
    }
    try {
        const reservations=await prisma.reservation.findMany({
            where:{
                userId:session.user.id
            },
            include:{
                listing:true
            },
           
        })
        return {ok:true,message:"found reservations",data:reservations,status:200}
    } catch (error) {
        console.error(error.message)
        return {ok:false, message:error.message,status:500}
    }
}

export async function setReservation({listingId,startDate,endDate,price}){
    const session=await getAuthSession()

    if(!session || !session.user){
        return {ok:false, message:"Not permitted",status:403}
    }
    if(!listingId || !startDate  || !endDate || !price){
        return {ok:false, message:"Missing fields",status:400}
    }
    try {
        const listAReservation=await prisma.listing.update({
            where:{id:listingId},
            data:{
                reservations:{
                    create:{
                        userId:session.user.id,
                        startDate,
                        endDate,
                        totalPrice:price
                    }
                }
            }
        })
        return {ok:true, message:"reserved", status:201}
    } catch (error) {
        return {ok:true, message:error.message, status:500}
    }
}

export async function deleteReservation(reservationId){
    const user=await getUser()

    if(!user){
        return {ok:false,message:'not authenticated',status:401}
    }
    if(!reservationId || typeof reservationId !== 'string'){
        return {ok:false, message:"Unable to delete reservation", status:402}
    }
    try {
        const resv=await prisma.reservation.deleteMany({
            where:{id:reservationId,
                OR:[{userId:user.id},{listing:{userId:user.id}}]
            }
        })
        return {ok:true, message:"reserved",status:200}
    } catch (error) {
        return {ok:true, message:error.message,status:500}
    }
}