import Prisma from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";



export const POST = async(req,res)=>{
  try {
    const {userId} = auth();
    const {jobId} = req.params;

    if(!userId){
        return new NextResponse("un authendicated please Login",{status:403})
    }
   const user = await Prisma.user.findUnique({where:{userId}});

//    if(!user){
//     return new NextResponse.json("user not found create Account",{status:403})
//    }
    const isvalidJob = await Prisma.job.findUnique({
        where:{
            id:jobId
        }
    });

    if(!isvalidJob){
        return new NextResponse("url params is not valid  please re-start the appling ",{status:403})
    }

    const applied = await Prisma.appliedBy.create({
        data:{
            user,
            job:isvalidJob
        }
    })
    
    return NextResponse.json(applied,{status:201})
    
  } catch (error) {
    return new NextResponse("internal error",{status:500})
  }
}

export const GET = async(req,res)=>{
    try {
        
        const {userId} = auth();

        if(!userId){
            return new NextResponse("un Authendicated please login",{status:403});
        }

        const appliedByUser = await Prisma.appliedBy.findMany({
            include:{
                job
            }
        });

        if(!appliedByUser){
            return new NextResponse("hey man you didn't apply any jobs",{status:402})
        }

        return NextResponse.json(appliedByUser,{status:201})
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}