import React, {  useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AddContext';
import Loading from '../../components/educator/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/educator/student/Footer';
import YouTube from 'react-youtube';


function CourseDetail() {

  const {id}=useParams();
  const [courseData, setcourseData] = useState(null);
  const [openSections, setopenSections] = useState({});
  const [isAlreadyEnrolled, setisAlreadyEnrolled] = useState(false);
  const [playerData , setPlayerData] = useState(null);

  const {allCourses,calculateRating ,calculateTotalLectures,calculateCourseDuration,calculateChapterTime,currency} = useContext(AppContext);

  const fetchCourseData = async () => {
   const findCourse =  allCourses.find(course => course._id === id)
   setcourseData(findCourse);
  }

  useEffect(()=>{
    fetchCourseData();
  },[allCourses])

  const toggleSection = (index) => {
    setopenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }


 return courseData ? (
  <>
    <div className="relative w-full bg-gradient-to-b from-cyan-100/70 px-4 sm:px-6 lg:px-0 pt-20 md:pt-36">
      {/* Background layer */}
      <div className="absolute top-0 left-0 w-full h-section-height -z-[1] bg-gradient-to-b from-cyan-100/70"></div>

      {/* Flex container for left & right columns */}
      <div className="flex flex-col-reverse md:flex-row items-start justify-between max-w-7xl mx-auto gap-10">

        {/* LEFT: Course Details */}
        <div className="flex-1 w-full z-10 text-gray-700 max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
            {courseData.courseTitle}
          </h1>
          <p
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
            className="text-sm md:text-base mb-3"
          ></p>

          {/* Ratings & Students */}
          <div className="flex flex-wrap items-center gap-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})
            </p>
            <p>
              {courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
            </p>
          </div>

          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Gautam Jha</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8">
            <h2 className="text-xl font-semibold text-gray-800">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                        src={assets.down_arrow_icon}
                        alt="arrow-icon"
                      />
                      <p className="font-medium text-sm md:text-base">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-base">
                      {chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="play-icon" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-xs md:text-base text-gray-800">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p onClick={()=> setPlayerData({ videoId:lecture.lectureUrl.split('/').pop()})} className="text-blue-500 cursor-pointer">Preview</p>
                              )}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ['h', 'm'],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Course Description */}
          <div className="py-10 text-sm md:text-base">
            <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
            <p
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              className="pt-3 rich-text"
            ></p>
          </div>
        </div>

        {/* RIGHT: Card Thumbnail */}
        <div className="w-full md:w-[350px] lg:w-[420px] bg-white z-10 shadow-custom-card rounded-lg overflow-hidden mx-auto md:mx-0">

           {
             playerData ? 
                <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-video' />
                : <img
            src={courseData.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-auto object-cover"
            
          />

           }

         
          <div className="p-4">
            <div className="flex items-center gap-2">
              <img className="w-4 h-4" src={assets.time_left_clock_icon} alt="Clock Icon" />
              <p className="text-red-500 text-sm">
                <span className="font-medium">5 Days</span> Left at this price
              </p>
            </div>

            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold '> {currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice/100).toFixed(2)}</p>
              <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice}</p>
              <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
            </div>

            <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-600'>

              <div className='flex items-center gap-1'>
                <img src={assets.star} alt="star-icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500/40'></div>

               <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} alt="clock-icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

               <div className='h-4 w-px bg-gray-500/40'></div>

               <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} alt="clock-icon" />
                <p>{calculateTotalLectures(courseData)} Lesson </p>
              </div>
              

            </div>

            <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>{isAlreadyEnrolled ? 'Already Enrolled':'Enrolled Now '}</button>

            <div className='pt-6'>
              <p className='md:text-xl text-lg font-medium text-gray-800'>Whats In the Course?</p>
              <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-600'>
                <li>Lifetime access with free updates</li>
                <li>Unlimited course enrollments with lifetime access</li>
                <li>Free updates and new features regularly added</li>
                <li>Access from any device – desktop, tablet, or mobile</li>
                <li>Interactive quizzes, assignments, and certifications</li>
                <li>24/7 support and detailed documentation available</li>

              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
    <Footer/>
  </>
) : (
  <Loading />
);

}

export default CourseDetail