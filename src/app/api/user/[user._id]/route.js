// for update thier cred

import Prisma from "@/lib/index";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const PATCH =async({req:user_id})=>{
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("un-authorized access",{status:400});
        }
        const user_id = req.params;

        const {firstName,lastName,email,password,phone,userType,profilePic,skills,highQuali,passedOut,linkedIn,experiences}= req.body;
       
        if(!firstName || !lastName || !email || !password || !phone || !userType || !profilePic || !skills || !highQuali  || !passedOut|| !linkedIn || !experiences){
        return new NextResponse(`all fields are required to update`)
       }
        const User = await Prisma.user.findUnique({
            where:{
                id:user_id,
                userId
            }
        });

        if(!User){
            return new NextResponse("un-Authorized access ",{status:400});

        }
        
        await Prisma.user.update({
            where:{
                id:user_id,
                userId
            },
            data:{
                firstName,
                profilePic,
                lastName,
                email,
                password,
                userType,

                educations:{
                 highQuali,
                 passedOut
                },
                socialLinks:{
                    linkedIn,
                    GitHub,
                },
                skills:{
                    createMany:{
                        data:{
                     ...skills.map((skill)=> skill.value)
                        }
                    }
                },
                
                phone,

            }
        })


        const userEducaction = await Prisma.user.findUnique({
            where:{
                id:user_id,
                userId
            },
            data:{
                experiences:{
                    createMany:{
                        data:[
                            ...experiences.map((exp)=> exp)
                        ]
                    }
                }
            }
        })
        
        return NextResponse.json(userEducaction, {status:200});
    } catch (error) {
        return NextResponse("user-id-Patch something went wrong please try agian",{status:500})
    }
}

export const DELETE = async({req:user_id})=>{
    try {
        const user_id =req.params;
        const {userId} = auth();

        const  User = await Prisma.user.findUnique({
            where:{
                id:user_id,
                userId
            }
        })
        if(!User){
            return new NextResponse("un authorized access",{status:400})
        }
        await Prisma.user.delete({
            where:{
                id:user_id
            }
        })
  return new NextResponse("user is deleted..", {status:201})
        
    } catch (error) {
        return NextResponse("user-id-delete something went wrong please try agian",{status:500})
    }
}

export const GET = async({req:user_id})=>{
    try {
        
        const user_id = req.params;

        const User = await Prisma.user.findUnique({
            where:{
                id: user_id
            }
        })

        return NextResponse.json(User,{status:200})
    } catch (error) {
        return NextResponse("user-id-delete something went wrong please try agian",{status:500})
   
    }
}