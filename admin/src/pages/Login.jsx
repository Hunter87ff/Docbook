import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios  from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
      event.preventDefault()
      try {
        if (state === 'Admin') {
          localStorage.removeItem('dToken'); // Admin login par doctor token hatao
          const { data } = await axios.post(backendUrl+'/api/admin/login', {
            email, password
          }, { withCredentials: true }
        )
          if(data.success){
            localStorage.setItem('aToken', data.token)
            setAToken(data.token);
          }else{
            toast.error(data.message)
          }
        } else {
          localStorage.removeItem('aToken'); // Doctor login par admin token hatao
          const { data } = await axios.post(backendUrl+'/api/doctor/login', {
            email, password
          },
          { withCredentials: true }
        )
          if(data.success){
            localStorage.setItem('dToken', data.token)
            setDToken(data.token)
            console.log(data.token);
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        console.log(error);
      }

    }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
     <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
            <span className='text-[#5F6FFF] '>{state}</span>Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email"  required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="password"  required/>
     </div>
     <button type="submit" className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
     {
        state === 'Admin' ? (
          <p className='text-sm text-[#5E5E5E] mt-2'>Doctor Login? <span className='text-[#5F6FFF] cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
        ) : (
          <p className='text-sm text-[#5E5E5E] mt-2'>Admin Login? <span className='text-[#5F6FFF] cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        )
     }
     </div>
    </form>
  )

}


export default Login