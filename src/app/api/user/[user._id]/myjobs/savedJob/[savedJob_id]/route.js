import Prisma from "@/lib";
import { NextResponse } from "next/server";



export const PUT = async(req,res)=>{
    try {
        const {userId} = auth();
        const {jobId} = req.params;

        const {statusByUser} = req.body;

        if(!userId){
            return new NextResponse("un authendicated",{status:403})
     }
        if(!jobId){
            return new NextResponse("job id missed or invalid ur params",{status:403})
        }

        const job = await Prisma.savedJob.findUnique({
            where:{
                userId,
                jobId
            }
        })
        if(!job){
            return new NextResponse("job not saved by user",{status:403})
        }

        const updatedJob = await Prisma.appliedBy.create({
           
            data:{
                 job,
                 userId
            }
        })
        return NextResponse.json(updatedJob,{status:201})
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}
export const DELETE = async(req,res)=>{
    try {
        const {userId} = auth();
        const {jobId} = req.params;

        if(!userId){
            return new NextResponse("un authendicated",{status:403})
     }
        if(!jobId){
            return new NextResponse("job id missed or invalid ur params",{status:403})
        }

        const job = await Prisma.savedJob.update({
            where:{
                userId,
                jobId
            }
        })
        if(!job){
            return new NextResponse("job not saved by user",{status:403})
        }

        await Prisma.savedJob.delete({
            where:{
                jobId
            }
        });
       return  new NextResponse("job deleted",{status:200})

    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}