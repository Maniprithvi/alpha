import Prisma from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req,res)=>{
    try {
        
        const {userId} = auth();
        const {jobId} = req.params;

        const jobsSaved  = await Prisma.savedJob.findUnique({
            where:{
                userId,
                jobId
            }
        });

        if(!jobsSaved){
            const jobSaved = await  Prisma.savedJob.create({
                data:{
                    userId,
                    jobId
                }
            })
            return NextResponse.json(jobSaved,{status:201})
        }
         return new NextResponse("job already saved in your bucket list",{status:400})
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}

export const GET = async (req,res)=>{
    try {
        const {userId} = auth();

        if(!userId){
            return  new NextResponse("un authendicated please log in ",{status:402})
        }
        const jobsSavedByUser = await Prisma.savedJob.findMany({
            where:{
                userId
            },
            include:{
                job:true
            }
        })
        
        return NextResponse.json(jobsSavedByUser,{status:201})
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}