import Prisma from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export const PUT = async(req,res)=>{
    try {
        const {userId} = auth();

        const {jobId} = req.params;
    
        const ApplicationStatus= "ShortListed"

        if(!userId){
            return new NextResponse("un authendicated",{status:403})
        }
      
        const user= await Prisma.employer.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            return new NextResponse("un authorized access",{status:403})
        }

      const isValidjob = await Prisma.job.findUnique({
        where:{
            id:jobId,
            employerId:user.id
        }
       });

       if(!isValidjob){
        return new NextResponse("un authorized access",{status:403})
       }

       const updateJob = await Prisma.appliedBy.update({
        where:{
            id:isValidjob.id
        },
        data:{
            status: ApplicationStatus
        }
       })
        return NextResponse.json(updateJob,{status:201});

    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}

export const GET = async (req,res)=>{
    try {

        const {userId} = auth();
        const {jobId} = req.params;

    
         if(!userId){
            return new NextResponse("un authendicated",{status:403})
        }
      
        const user= await Prisma.employer.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            return new NextResponse("un authorized access",{status:403})
        }

      const isValidjob = await Prisma.job.update({
        where:{
            id:jobId,
            employerId:user.id
        },
        data:{
            status:"Viewed"
        }
       });


       if(!isValidjob){
        return new NextResponse("un authorized access",{status:403})
       }

       return NextResponse.json(isValidjob,{status:201})
       

    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}