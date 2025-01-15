"use client";
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  )
}

export default AuthProvider
