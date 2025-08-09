import { prisma } from "@/utils/prisma"
import { hash } from "keyhasher"
import { NextResponse } from "next/server"


export async function POST(request){
    const body=await request.json()
    const {name,email,password}=body

    if(!name.trim() || !email.trim() || !password.trim()){
        return NextResponse.json({message:"fields are empty"},{status:400})
    }

    const hashedPW=hash(password)
    try {
        const user=await prisma.user.create({
            data:{
                name,
                email,
                hashedPassword:hashedPW
            }
        })
        console.log(user);
       return NextResponse.json(user,{status:201})
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({message:error.message},{status:500})
    }
}