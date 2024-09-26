import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import NavBar from '../../components/Navbar/NavBar'
import './Lists.scss'
import DataTable from '../../components/dataTable/DataTable'
const Lists = () => {
  return (
    <div className="list">
      <SideBar/>
      <div className="listContainer">
        <NavBar/>
        <DataTable/>
      </div>
    </div>
  )
}

export default Lists
