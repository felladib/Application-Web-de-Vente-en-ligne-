import React from 'react'
import "./HomeAdmin.scss"
import SideBar from '../../components/Sidebar/SideBar'
import NavBar from '../../components/Navbar/NavBar'
import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import TableProd from '../../components/table/TableProd'
const HomeAdmin = () => {
  return (
    <div className='home'>

      
      <SideBar/>
      <div className="homeContainerr">
        <NavBar/>
        <div className="widgets">
          <Widgets type="user"  />
          <Widgets type="order" />
          <Widgets type="earning" />
          <Widgets type="balance"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
            <TableProd></TableProd>

        </div>
      </div>



    </div>
  )
}

export default HomeAdmin
// rafc pour crre fonction