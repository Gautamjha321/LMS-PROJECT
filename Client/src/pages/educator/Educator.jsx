import React from 'react'
import { Outlet } from 'react-router-dom'

function Educator() {
  return (
    <div>
      <h1>Educator pages</h1>
<div>
  {<Outlet/>}
</div>

    </div>
    
  )
}

export default Educator