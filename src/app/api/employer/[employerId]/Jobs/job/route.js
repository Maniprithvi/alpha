import Prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req,res)=>{
try {
    const {userId} = auth();
const {title, experience,description,skills,jobType}= req.body;

    if(!userId){
        return new NextResponse("un authorized access please login");
    }
    const employer = await Prisma.employer.findUnique({
        where:{
            userId
        }
    });

    if(!employer){
        return new NextResponse("exployer not found with ur id please login");
    }


    const job = await Prisma.job.create({
        data:{
            title,
            employer,
            description,
            jobType,
            experience,
            skills:{
                createMany:{
                    data:[
                        ...skills.map((skill)=>skill)
                    ]
                }
            }
        }
    })

if(!job) {
    return new NextRequest("unCaught error ",{status:400})
}
 return NextResponse.json(job,{status:200})
    
    
} catch (error) {
    return new NextResponse("un Caught internal error",{status:500})
}
}

export const GET = async(req,res)=>{

    const {userId} =auth();

    if(!userId){
        return new NextResponse("un authorized access please login",{status:403})
    }

    const jobs = await Prisma.job.findMany({});
}