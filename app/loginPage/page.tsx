"use client";
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation' 
import { useEffect } from 'react'

const Login = () => {
  const {status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to the homepayage
    }
  }, [status, router]);

  if (status === 'loading'){
    return <div>Loading...</div>
  }


  return (
    <div className='place-items-center'>
    <div className='flex justify-center flex-col bg-yellow-400 w-56 items-center gap-5 p-5'>
      <div className='bg-yellow-200 w-max p-4 rounded-md items-center cursor-pointer'  onClick={() => signIn("google")}>Sign in with Google</div>
      <div className='bg-yellow-200 w-max p-4 rounded-md items-center cursor-pointer' onClick={() => signIn("github")}>Sign in with Github</div>
    </div>
    </div>
  )
}
export default Login
