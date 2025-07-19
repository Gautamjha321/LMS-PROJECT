import { createContext, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

 export const AppContext = createContext();

 export const  AppContextProvider=(props)=>{

  const currency = import.meta.env.VITE_CURRENCY 
  const navigate = useNavigate(); 
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [EnrolledCourses, setEnrolledCourses] = useState([]); // This state can be used to manage enrolled courses if needed

  //fetch all the courses 

  const fetchAllCourses = async () => {
     setAllCourses(dummyCourses);

  }

  //calculating the total average rating 

  const calculateRating =(course)=>{
if(course.courseRatings.length === 0){
  return 0;
}
let totalRating = 0; 
course.courseRatings.forEach(rating => {
  totalRating += rating.rating;
  })
return totalRating / course.courseRatings.length;
  }

  //function to calculate the course chapter time 
  const calculateChapterTime = (chapter)=>{
    let time= 0;
    chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration);
    return humanizeDuration(time * 60 * 1000, { units: ['h','m'] });

  }

  // calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  }

  // function to total number of lecture in the course 

  const calculateTotalLectures = (course) => {
let totalLectures = 0;
course.courseContent.forEach((chapter) => {
   if(Array.isArray(chapter.chapterContent)) {
    totalLectures += chapter.chapterContent.length;
   }
  });
return totalLectures;
  }

  // fetch user enrolled courses
  const fetchEnrolledCourses = async () => {
    // This function can be used to fetch enrolled courses from an API or database
    // For now, we will just set it to an empty array
    setEnrolledCourses(dummyCourses);
  }

  useEffect(()=>{
    fetchAllCourses();
    fetchEnrolledCourses();
  },[]);



const value ={
currency, allCourses,navigate,calculateRating,isEducator, setIsEducator,calculateTotalLectures,calculateCourseDuration,calculateChapterTime , EnrolledCourses,setEnrolledCourses,fetchEnrolledCourses
}


return (
  <AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>
)

 }