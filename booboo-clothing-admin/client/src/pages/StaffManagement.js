import React from 'react'
import Navbar from '../components/Navbar'
import StaffManagementContent from '../components/staff_components/StaffManagementContent'

export const StaffManagement = () => {
  return (
    <div>
      <Navbar />
      <StaffManagementContent />
    </div> 
  )
}

export default StaffManagement;