import Prisma from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export const PUT = async(req,res)=>{
    try {
        const {userId} = auth();

        const {jobId} = req.params;
    
        const ApplicationStatus= "Withdraw"

        if(!userId){
            return new NextResponse("un authendicated",{status:403})
        }
      
        const user= await Prisma.user.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            return new NextResponse("un authorized access",{status:403})
        }

      const isValidjob = await Prisma.appliedBy.findUnique({
        where:{
            id:jobId,
            userId:user.id
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

export const DELETE = async (req,res)=>{
    try {

        const {userId} = auth();
        const {jobId} = req.params;

    
         if(!userId){
            return new NextResponse("un authendicated",{status:403})
        }
      
        const user= await Prisma.user.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            return new NextResponse("un authorized access",{status:403})
        }

      const isValidjob = await Prisma.appliedBy.findUnique({
        where:{
            id:jobId,
            userId:user.id
            
        },include:{
            status:"Withdraw"
        }
      
       });
       if(!isValidjob.status === "Withdraw"  && !isValidjob){
        return new NextResponse("please withdraw the application then  you can delete the application ",{status:403})
       }
     
       await Prisma.appliedBy.delete({
        where:{
            id:isValidjob.id
        }
    });

    return new NextResponse("job deleted from applied",{status:201})

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
      
        const user= await Prisma.user.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            return new NextResponse("un authorized access",{status:403})
        }

      const isValidjob = await Prisma.appliedBy.findUnique({
        where:{
            id:jobId,
            userId:user.id
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