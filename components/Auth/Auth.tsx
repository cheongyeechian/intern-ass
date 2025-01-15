"use client"
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

const Auth = () => {
    // const [open, setOpen] = useState(false);
    const {status} = useSession();

  return (
    <div >
      {status === "unauthenticated" ? (
        <Link href="/loginPage">Login</Link>
      ):(
        <div className=''>
        <Link href="./writePost" className='px-2'>Write Post</Link>
        <span className='px-2' onClick={() => signOut()}>Log Out</span>
        </div>
      )
    }
    </div>
  )
}

export default Auth
