import React, { useEffect, useState } from 'react'

function Rating({initialRating,onRate}) {
  const [rating, setRating] = useState(initialRating || 0) // Example rating value

  const handleRating =(value)=>{
    setRating(value);
    // Here you can also send the rating to the server or perform any other action
    if( onRate ) onRate(value);
  }

  useEffect(()=>{
    if(initialRating){
    setRating(initialRating);
    }
  },[initialRating]);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
       const startValue = index + 1;
       return(
        <span key={index} className={` text-xl sm:text-2xl cursor-pointer transition-colors ${startValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`} onClick={()=> handleRating(startValue)}  >
          &#9733; 
        </span>
       )
      })}
    </div>
  )
}

export default Rating