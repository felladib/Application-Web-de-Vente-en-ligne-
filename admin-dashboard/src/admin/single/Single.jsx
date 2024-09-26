import React from 'react'

import SideBar from '../../components/Sidebar/SideBar'
import NavBar from '../../components/Navbar/NavBar'

const Single = () => {
  console.log('hello')
  return (
    <div className='single'>
      <SideBar/>
      <div className="singleContainer">
        <NavBar/>
        <div className="top">
          <div className="item">
            
          </div>
          <div className="left">
            <h1 className="title"></h1>
          </div>
          <div className="right">

        </div>
        <div className="bottom"></div>
        </div>

      </div>
    </div>
  )
}

export default Single
