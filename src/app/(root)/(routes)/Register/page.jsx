"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import { redirect} from "next/navigation"
import { TypeAnimation } from "react-type-animation"
import axios from 'axios'

const schema = yup
  .object({
    name: yup.string().required(),
    email:yup.string().email(),
    password:yup.string().min(6),
    // role:yup.string().required()
  })
  .required()
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [role, setRole] = useState('');
  const [showStudentComponent, setShowStudentComponent] = useState(false);
  const [showTeacherComponent, setShowTeacherComponent] = useState(true);


  const Fetch =async()=>{
   await axios.get('/api/employer')
   .then(()=>{
    console.log(" im clicked")
   }) .catch((e)=>{
    console.log(e.message)
  })  
  }

 // watch input value by passing the name of it
 

 const handleUserFormSubmit = (data) => {
    console.log("user",data)
     };
   
     const handleEmployerFormSubmit = async(data) => {
      await axios.post('/api/employer',data)
     

      .then(()=>{
        console.log("form submitted")
       redirect('/employer');
      })
      .catch((e)=>{
        console.log(e.message)
      })    
     };
  return (
    <>
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
<form onSubmit={handleSubmit(role === 'user' ? handleUserFormSubmit : handleEmployerFormSubmit)}>


{/* selecting user role */}
    <div className="flex">
 <h1> <TypeAnimation
  sequence={[
    'Who you Are ?',
    1000,
  ]}
  speed={50}
  style={{ fontSize: '2em' }}
/></h1>  
<>
        <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
            
              // {...register("role")}
              onChange={() =>{ setRole('user')
                setShowStudentComponent(true);
                setShowTeacherComponent(false);
  } }
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="employer"
              // {...register("role")}
              checked={role === 'employer'}
              onChange={() =>{ setRole('employer')
                setShowStudentComponent(false);
                setShowTeacherComponent(true);
              }}
            />
            Employer
          </label>
          </>
    </div>
        <div>
            <p>name</p>
        <input className="
        text-black" {...register("name")} />
         <p>{errors.name?.message}</p>
      </div>
      <div>
        <p>email</p>
        <input className="text-black" {...register("email")} />
         <p>{errors.email?.message}</p>
      </div>
      <div>
        <p>password</p>
        <input className="
        text-black"{...register("password")} />
         <p>{errors.password?.message}</p>
      </div>
  
  <button type="submit">Submit</button>

  
    </form>
    <button onClick={()=>Fetch}>Fetch</button>
  </>
  )
}