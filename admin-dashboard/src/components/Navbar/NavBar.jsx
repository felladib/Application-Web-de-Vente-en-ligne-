import React from 'react'
import "./NavBar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { user } from './../../assets'; 


const NavBar = () => {
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...'/>
          <SearchOutlinedIcon className='icon'></SearchOutlinedIcon>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className='icon'></LanguageOutlinedIcon>
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className='icon'></DarkModeOutlinedIcon>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className='icon'></FullscreenExitOutlinedIcon>
          </div>
          <div className="item">
            <NotificationsNoneIcon className='icon'></NotificationsNoneIcon>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className='icon'></ChatBubbleOutlineOutlinedIcon>
            <div className="counter">1</div>
          </div>
          <div className="item">
           <ListOutlinedIcon className='icon'></ListOutlinedIcon>
          </div>

          <div className="item">
           <img src={user} className='avatar' alt='avatar' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar
