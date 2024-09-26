import React from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {name: "January" , total : 1200},
  {name: "Februray" , total : 2100},
  {name: "March" , total : 850},
  {name: "Apil" , total : 1600},
  {name: "May" , total : 980},
  {name: "June" , total : 1700},

];

const Chart = () => {
  return (
    <div className='chart'>
      <div className="title">Last 6 months (Revenue) </div>
      <ResponsiveContainer width= "100%" aspect={2 / 1}>
        <AreaChart height="100%" width="100%" data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke='gray'/>
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3"  className='chartGrid'/>
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
          {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart
