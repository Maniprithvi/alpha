import Prisma from "@/lib";
import { NextResponse } from "next/server"


export const GET = async(req,res)=>{
    try {
        const {userId} = auth;
        const {employerId } = req.body;

        if(!userId){
            return new  NextResponse("un authendicated",{status:403})
        }

        if(!employerId){
            return new NextResponse("un authoried access",{status:400})
        }

        const jobs = await Prisma.job.findMany({
            where:{
               employerId
            },
            include:{
                appliedBy:true
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return NextResponse.json(jobs,{status:201})
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
} 