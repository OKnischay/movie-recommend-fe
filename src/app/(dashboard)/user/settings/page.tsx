
import SettingsPage from '@/components/common/Setting'
import { DashboardHeader } from '@/components/dashboard/user/Header'
import Footer from '@/components/landing-page/Footer'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-background">
          <DashboardHeader />
      <SettingsPage/>
      </div>
  )
}

export default page