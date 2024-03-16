// createing employer

import Prisma from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const POST=async(req,res)=>{
   try {
    const {userId} = auth();
    const body = await req.json()

//    console.log(new Date(),body,userId)
   const {name,email}= body;
   

   if(!userId){
       return new NextResponse("dei mariru login panraa",{status:404});
   }

   if(!name || !email  ){
       return new NextResponse("all fields are required to register",{status:400})
   };

   const employerExist = await Prisma.employer.findUnique({
       where:{
           email
       }
   });
console.log("employer data",employerExist);
   if(employerExist){
    // console.log("please login")
       return new NextResponse("user already registered ,please log In",{status:400})
   }
 

   const employer = await Prisma.employer.create({
       data:{
           name,
           userId,
           email
       }
   })
  
  return  NextResponse.json(employer,{status:200});

    
   } catch (error) {
    return new NextResponse("un-caught error ",{status:500})
   }
}


export const GET = async()=>{
    try {
        console.log("hai")
        const {userId} = auth();

        if(!userId){
            return new NextResponse("please login",{status:400})

        }  
        const  employer = await Prisma.employer.findMany({}) 
        console.log(employer)
      
        return NextResponse.json(employer);
        
    } catch (error) {
       return new NextResponse("Employer-get internal error",{status:500}) 
    }
}