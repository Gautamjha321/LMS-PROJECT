import React, { useContext, useEffect ,useState } from 'react'
import { AppContext } from '../../context/AddContext';
import SearchBar from '../../components/educator/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/educator/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/educator/student/Footer';


function CoursesList() {

  const {navigate, allCourses} = useContext(AppContext);
  const {input } = useParams();

  const [FilteredCourse, setFilteredCourse] = useState([]);

  useEffect(()=>{
    if(allCourses && allCourses.length > 0){
       const tempCourses = allCourses.slice();
       input ? setFilteredCourse(tempCourses.filter((item) => item.courseTitle.toLowerCase().includes(input.toLowerCase()))) : setFilteredCourse(tempCourses);
    }
  },[allCourses, input]);

  return (
    <>
    <div className='relative md:px-36 px-8 pt-20 text-left'>
      <div className='flex md:flex-row flex-col items-start justify-between w-full gap-6'>
        <div>
          <h1 className='text-4xl font-semibold text-gray-800'>CourseList</h1>
        <p className='text-gray-500'> <span  onClick={()=>navigate('/')} className='text-blue-600 cursor-pointer '>Home </span> /  <span>CourseList </span></p>

        </div>
        <SearchBar data={input} />
        
      </div>
      {
        input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600'>
          <p>{ input}</p>
          <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={()=>navigate('/course-list')} />
          </div>
      }

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 my-10 gap-4'>
        {FilteredCourse.map((course,index)=> <CourseCard key={index} course={course} />)}

      </div>

    </div>
    <Footer/>
    </>
  )
}

export default CoursesList