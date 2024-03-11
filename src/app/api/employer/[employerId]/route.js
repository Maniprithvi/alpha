// for update thier cred

import Prisma from "@/lib/index";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const PATCH =async({req:company_id})=>{
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("un-authorized access",{status:400});
        }
        const company_id = req.params;

        const {name,email,password,about ,profilePic,websiteUrl,gitUrl,address}= req.body;
       
        if(!name || !email || !password || !about || !profilePic || !websiteUrl || !gitUrl || !address ){
        return new NextResponse(`all fields are required to update`)
       }
        const User = await Prisma.employer.findUnique({
            where:{
                id:company_id,
                userId
            }
        });

        if(!User){
            return new NextResponse("un-Authorized access ",{status:400});

        }
        const Employer = await Prisma.employer.update({
            where:{
          id:company_id
            },
            data:{
                name,
                email,
                password,
                about,
                address,
                profilePic,
                socialLinks:{
                    portfolio:websiteUrl,
                    GitHub:gitUrl
                }
            }
        });

     return  NextResponse.json(Employer,{status:200});

    } catch (error) {
        return NextResponse("user-id-Patch something went wrong please try agian",{status:500})
    }
}

export const DELETE = async({req:company_id})=>{
    try {
        const company_id =req.params;
        const {userId} = auth();

        const  User = await Prisma.employer.findUnique({
            where:{
                id:company_id,
                userId
            }
        })
        if(!User){
            return new NextResponse("un authorized access",{status:400})
        }
        await Prisma.user.delete({
            where:{
                id:company_id
            }
        })
  return new NextResponse("user is deleted..", {status:201})
        
    } catch (error) {
        return NextResponse("user-id-delete something went wrong please try agian",{status:500})
    }
}

export const GET = async({req:company_id})=>{
    try {
        
        const company_id= req.params;

        const Employer = await Prisma.user.findUnique({
            where:{
                id: company_id
            }
        })

        return NextResponse.json(Employer,{status:200})
    } catch (error) {
        return NextResponse("user-id-delete something went wrong please try agian",{status:500})
   
    }
}