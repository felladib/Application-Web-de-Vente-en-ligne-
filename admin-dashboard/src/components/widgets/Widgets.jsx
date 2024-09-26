import React from 'react'
import './widgets.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const widgets = ({type}) => {

  let data;
  
  switch(type){
    case "user":
      data={
        title : "USERS",
        isMoney : false,
        link : "See all users",
        icon:(
          <PersonOutlineIcon className='icon' style = {{ 
            color : "crimson" ,
            backgroundColor : "rgba(255,0,0,0.2)"
          }}/>
        )
      }; break ;
      case "order":
      data={
        title : "ORDERS",
        isMoney : false,
        link : "See all orders",
        icon:(
          <CreditCardOutlinedIcon className='icon' style = {{ 
            color : "gold" ,
            backgroundColor : "rgba(230, 230, 0, 0.2)",
          }}/>
        )
      }; break ;
      case "earning":
      data={
        title : "EARNING",
        isMoney : true,
        link : "view net earning",
        icon:(
          <MonetizationOnIcon className='icon' style = {{ 
            color : "green" ,
            backgroundColor : "rgba(0,128,0,0.2)",
          }}/>
        )
      }; break ;
      case "balance":
      data={
        title : "BALANCE",
        isMoney : true,
        link : "See details",
        icon:(
          <AccountBalanceWalletIcon className='icon' style = {{ 
            color : "purple" ,
            backgroundColor : "rgba(128,0,128,0.2)"
          }}/>
        )
      }; break ;
      default:
        break;
  }


  return (
    <div  className='widget'>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "$"} {100}</span>
        <span className="link"> {data.link} </span>

      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon/>
          {20}%
        </div>
         {data.icon}
      </div>
    </div>
  )
}

export default widgets
