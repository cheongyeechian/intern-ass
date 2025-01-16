"use client"
import React from 'react'
import Auth from './Auth/Auth'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const {data: session, status} = useSession();
  return (
    <div className="flex flex-row place-content-between p-5 text-white shadow-md shadow-gray-700">
      <Link href="/">
        <div className="navbar ">
          <div className="btn btn-ghost text-xl">A Blog Page</div>
        </div>
      </Link>

    <div>{status === 'authenticated' && session?.user?.name && (
      <span className='text-black'>Hi,{session.user.name}</span>
    )}</div>

      <div>
        <Auth />
      </div>
    </div>
  );
}

export default Navbar
