import { LoginForm } from '@/components/auth/LoginForm'
import React from 'react'
import Image from 'next/image'
const LoginPage = () => {
  return (
  <div className="flex min-h-screen items-center justify-center px-6 md:px-12">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl border-2 bg-gradient-to-br from-yellow-50 via-sky-200 to-pink-100 shadow-2xl shadow-gray-400 md:flex-row">
        <div className="w-full md:w-1/2">
          <LoginForm/>
        </div>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/mc1.jpg"
            alt="Login Image"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage