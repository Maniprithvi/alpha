
import React from 'react'
import {auth} from '@clerk/nextjs'
import Register from './Register/page'
import Prisma from '@/lib'
import { redirect } from 'next/navigation'

const page = async() => {

const {userId}=auth()

// const user = await Prisma.user.findUnique({
//   where:{
    // userId
//   }
// }) 

// const employer = await Prisma.employer.findUnique({
//   where:{
//     userId
//   }
// })

// if(user){
//   redirect('/user')
// }
// if(user){
//   redirect('/employer')
// }
  return (
    <div className=' w-full h-full flex justify-center align-middle'>
      <Register />
    </div>
  )
}

export default page