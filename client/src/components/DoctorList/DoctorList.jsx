import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import DoctorCard from '../DoctorCard/DoctorCard.jsx'

function DoctorList() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-5">
        <DoctorCard />
      </div>
      <div className="my-5">
        <DoctorCard />
      </div>
    </div>
  )
}

export default DoctorList