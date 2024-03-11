import Prisma from "@/lib/index";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";



export default async function SetupLayout ({children}){

    const { userId }= auth();

    if(!userId){
        redirect('/sign-in');
    }
    
    //  user id check for routing
//    const User = await Prisma.user.findUnique({
//         where:{
//             userId:userId
//         }
//     });
    
//     if(User){
//         redirect(`/${User.id}`);
    // }
    // employer id check for routing
    // const Employer = await Prisma.employer.findUnique({
    //     where:{
    //         userId
    //     }
    // })
    // if(Employer){
    //     redirect(`/${Employer.id}`);
    // }

    return(
        <>
        {children}
        </>
    )
}