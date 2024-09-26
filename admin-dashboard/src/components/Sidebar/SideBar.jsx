import React from 'react'
import "./SideBar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import StoreIcon from '@mui/icons-material/Store';
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo"> Noelle Admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" className='link'>
            <li>
              <DashboardIcon className='icon'/> 
              <span> Dashboard </span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/Users" className='link'>
            <li>
              <PersonOutlineIcon className='icon'></PersonOutlineIcon>
              <span>Users</span>
            </li>
          </Link> 

          <li>
            <StoreIcon className='icon' />
            <span>Product</span>
          </li>
          <li>
            <CreditCardOutlinedIcon className='icon' />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingOutlinedIcon className='icon'/>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <QueryStatsOutlinedIcon className='icon'/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className='icon'></NotificationsNoneIcon>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
          < SettingsSystemDaydreamOutlinedIcon className='icon'/>
            <span>System health</span>
          </li>
          <li>
            < PsychologyOutlinedIcon className='icon'></PsychologyOutlinedIcon>
            <span>Logs</span>
          </li>
          <li>
            
            <SettingsOutlinedIcon className='icon'></SettingsOutlinedIcon>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          <li>
            <PersonOutlineIcon className='icon'></PersonOutlineIcon>
            <span>Profil</span>
          </li>
          <li>
            <AccountCircleOutlinedIcon className='icon'></AccountCircleOutlinedIcon>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>

      </div>
      
    </div>
  )
}

export default SideBar
