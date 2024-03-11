// createing employer

import Prisma from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const POST=async(req,res)=>{
   try {
    const {userId} = auth();
    const body = await req.json()

   console.log(new Date(),body,userId)
   const {name,email,password}= body;
   

   if(!userId){
       return new NextResponse("dei mariru login panraa",{status:404});
   }
  console.log('im hitted-1')
   if(!name || !email || !password ){
       return new NextResponse("all fields are required to register",{status:400})
   };
//    console.log('im hitted-2')
   const employerExist = await Prisma.employer.findUnique({
       where:{
           userId
       }
   });
   console.log(employerExist,'im hitted-3')
   if(employerExist){
       return new NextResponse("user already registered ,please log In",{status:400})
   }
   console.log('im hitted-4')
   const employer = await Prisma.employer.create({
       data:{
           name,
           userId,
           email,
           password
       }
   })
   console.log('im hitted-5')
  return  NextResponse.json(employer,{status:200});

    
   } catch (error) {
    return new NextResponse("un-caught error ",{status:500})
   }
}

export const POT =async(req,res)=>{
    try {
        const {userId} = auth();
        const body = req.json();
        const {name,email,password}= body;
        console.log(name,email,password)

        if(!userId){
            return new NextResponse("dei mariru login panraa",{status:404});
        }
        if(!name || !email || !password ){
            return new NextResponse("all fields are required to register",{status:400})
        };
       
        const employerExist = await Prisma.employer.findUnique({
            where:{
                userId
            }
        });

        if(employerExist){
            return new NextResponse("user already registered ,please log In",{status:400})
        }

        const employer = await Prisma.employer.create({
            data:{
                name,
                userId,
                email,
                password
            }
        })
       return  NextResponse.json(employer,{status:200});


    } catch (error) {
        return new NextResponse("Employer-post internal error",{status:500})
    }
}

export const GET = async()=>{
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("please login",{status:400})

        }  
        const  employer = await Prisma.employer.findMany({})
      
        return NextResponse.json(employer);
        
    } catch (error) {
       return new NextResponse("Employer-get internal error",{status:500}) 
    }
}