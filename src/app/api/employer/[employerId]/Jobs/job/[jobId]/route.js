import Prisma from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const PATCH =async(req,res,)=>{
    try {
        const {userId}= auth();
        const {employerId,jobId }= req.params;
        const {title,description,expired,skills,workingMode}=req.body
        
        if(!userId){
            return  new NextResponse("un authendicated",{status:400})
        }
        if(!employerId  || !jobId){
            return new NextResponse(`job /employer request params need to continue...`);
        }

        const employer = await Prisma.employer.findUnique({
            where:{
                id:employerId,
                userId
            }
        });

        if(!employer){
            return new NextResponse("un authorized access",{status:404});
        }

        const job = await Prisma.job.update({
            where:{
                id:jobId
            },
            data:{
             title,
             description,
             expired,
             mode:workingMode,
             skills:{
                createMany:{
                    data:[
                        ...skills.map((skill)=>skill)
                    ]
                }
             },
             experience 
            }
        })

          return NextResponse.json(job,{status:200})
        
    } catch (error) {
      return new NextResponse("un caught server error",{status:500})   
    }
}

export const GET = async(req,res)=>{
    try {
        const {jobId} = req.params 

        const {userId} = auth();

if(!userId){
    return new NextResponse("un authendicated ,plese login",{status:403})
}

const job = await Prisma.job.findUnique({
    where:{
        id:jobId
    }
})
return NextResponse(job,{status:200})

    } catch (error) {
        return new NextResponse("un caught server error",{status:500})   
    }
}

export const DELETE = async(Req,res)=>{
    try {
        const {userId} = auth();
        const {employerId,jobId} = req.params;

        if(!userId){
            return new NextResponse("un authendicated,please log in",{status:403})
        }
        if(!employerId || !jobId){
            return new NextResponse("in valid request params",{status:403})
        }
        const employer = await Prisma.employer.findUnique({
            where:{
                userId,
                id:employerId
            },
            include:{
                jobs:{
                    where:{
                        id:jobId
                    }
                }
            }
        })
        if (!employer){
            return new NextResponse("un authorized access",{status:404})
        }

        await Prisma.job.delete({
            where:{
                id:jobId
            }
        })

        return new NextResponse("job Post deleted",{status:201})

    } catch (error) {
        return new NextResponse("un caught server error",{status:500})  
    }
}