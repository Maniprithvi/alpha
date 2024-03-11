import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from '@/lib'
// import NavBar from '@/components/Navbar'


export default async function DashBoardLayout ({children}){
  
const {userId} = auth();

if(!userId){
    redirect('/sign-in');
}
// const user = await prisma.user.findFirst({
//     where:{
//         id:params.storeId,
//         userId
//     }
// })

// if(!user){
//     redirect('/');
// }

return(
<>
<div>
   {/* <NavBar /> */}
    {children}
</div>
</>


)

}