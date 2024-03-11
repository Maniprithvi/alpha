import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import  Prisma from '@/lib/index'

export const POST =async()=>{
    try {
        const {userId} = auth();

        const {firstName,lastName,email,password,phone} = req.body;

        console.log(firstName,lastName,email)

        if(!firstName || !lastName || !email || !password || !phone){
            return new NextResponse("all the fields must be fill", {status:400})
        }
        const userExist = await Prisma.user.findUnique({
            where:{
                userId:userId
            }
        })

        if(userExist){
            return new NextResponse("user is Exist please login", {status:400})
        }

        const User = await Prisma.user.create({
            data:{
                userId,
                firstName,
                lastName,
                email,
                password,
                mobile:phone
            }
        })
        if(!User){
            return new NextResponse("something went wrong try after sometimes", {status:500})
        }
          return NextResponse.json(User)

    } catch (error) {
        console.log('Post-User',error);
        return new NextResponse('internal Error ',{status:500});
    }
}

export const GET = async()=>{

    try {
        const {userId} = auth();

    const Users = await Prisma.user.findMany({});
     return NextResponse.json(Users)
        
    } catch (error) {
      return NextResponse("something went wrong",{status:500})   
    }

    
}