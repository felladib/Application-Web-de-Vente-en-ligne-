import React from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
// installation necessaire => react-circular-

const Features = () => {
  return (
    <div className='featured'>
      <div className="top">
        <h1 className="title">
          Total Revenue
        </h1>
        <MoreVertIcon className='icon' fontSize='small'/>
        
      </div>
      <div className="bottom">
        <div className="featuredChart">
            <CircularProgressbar value={70} text='70%' strokeWidth={5} ></CircularProgressbar>
        </div>
        <p className="title">
          Total sales made today
        </p>
        <p className="amount">$4253 </p>
        <p className='desc'>Previous Transitions processing. Last payments may not be included</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last month</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize='small'/>
              <div className="resultAmount">$12.4</div>
            </div>
          </div>
           
        </div>
      </div>
    </div>
  )
}

export default Features
