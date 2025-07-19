import React from 'react'
import { assets, dummyTestimonial } from '../../../assets/assets'

function TestimonialsSection() {
  return (
    <div className='pb-14 px-8 md:px-0'>
    <h2 className='text-3xl font-medium text-gray-800'>TestiMonials</h2>
    <p className='md:text-base text-gray-500 mt-3'>Hear from our learners as they share thier journeys of trasnfomation , success, and how our <br /> platform has made a difference in their lives. </p>
 <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mt-10 px-4">
  {dummyTestimonial.map((testimonial, index) => (
    <div
      key={index}
      className="w-full sm:w-[47%] md:w-[30%] lg:w-[22%] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center gap-4 px-5 py-4 bg-gray-50 border-b border-gray-100">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={testimonial.image}
          alt={testimonial.name}
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{testimonial.name}</h1>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
              alt="star"
              className="h-5 w-5"
            />
          ))}
        </div>

        {/* Feedback */}
        <p className="text-gray-600 text-sm mb-4">{testimonial.feedback}</p>

        {/* Read More */}
        <a href="#" className="text-blue-500 text-sm underline hover:text-blue-600">
          Read More
        </a>
      </div>
    </div>
  ))}
</div>



    </div>
  )
}

export default TestimonialsSection