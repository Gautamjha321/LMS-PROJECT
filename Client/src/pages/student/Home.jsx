import React from 'react'
import Hero from '../../components/educator/student/Hero'
import Companies from '../../components/educator/student/Companies'
import CoursesSection from '../../components/educator/student/CoursesSection'
import TestimonialsSection from '../../components/educator/student/TestimonialsSection'
import CallToAction from '../../components/educator/student/CallToAction'
import Footer from '../../components/educator/student/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>

      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home