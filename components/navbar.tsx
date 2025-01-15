import React from 'react'
import Auth from './Auth/Auth'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex flex-row place-content-between bg-yellow-100 p-5">
      <Link href="/">
        <div className="navbar ">
          <div className="btn btn-ghost text-xl">A Blog Page</div>
        </div>
      </Link>

      <div>
        <Auth />
      </div>
    </div>
  );
}

export default Navbar
