import React from 'react'
import './table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { user } from './../../assets'; 



const TableProd = () => {
    const rows = [
        {
            id:12356,
            product:'Acer Nitro 5',
            img : user,
            customer : "Din smith",
            date : "1 March",
            methode : "Cash On delivery",
            amount : 1000,
            status : "Approved",
        },
        {
            id:12556,
            product:'Play Station 4',
            img : user,
            customer : "Adam James",
            date : "9 May",
            methode : "Online",
            amount : 450,
            status : "Approved",
        },
        {
            id:12056,
            product:'Xbox 360',
            img : user,
            customer : "John smith",
            date : "22 January",
            methode : "Cash On delivery",
            amount : 234,
            status : "pending",
        },
        {
            id:12376,
            product:'Acer Nitro 3',
            img : user,
            customer : "Harold Carol",
            date : "17 June",
            methode : "Cash On delivery",
            amount : 540,
            status : "Approved",
        },
        {
          id:12376,
          product:'Acer Nitro 3',
          img : user,
          customer : "Harold Carol",
          date : "17 June",
          methode : "Cash On delivery",
          amount : 540,
          status : "Approved",
      },
        
    ]
    return (
        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className='tableCell'>Tracking ID</TableCell>
                <TableCell className='tableCell'>Product</TableCell>
                <TableCell className='tableCell'>Customer</TableCell>
                <TableCell className='tableCell'>Date</TableCell>
                <TableCell className='tableCell'>Amount</TableCell>
                <TableCell className='tableCell'>Payment Method</TableCell>
                <TableCell className='tableCell'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  <TableCell className='tableCell'>   {row.id}     </TableCell>
                  <TableCell className='tableCell'>
                    <div className="cellWrapper">
                      <img src={row.img}  className='image' />
                      {row.product}
                    </div>
                    
                  </TableCell>
                  <TableCell className='tableCell'>{row.customer}</TableCell>
                  <TableCell className='tableCell'>{row.date}</TableCell>
                  <TableCell className='tableCell'>{row.amount}</TableCell>
                  <TableCell className='tableCell'>{row.methode}</TableCell>
                  <TableCell className='tableCell'><span className={`status ${row.status}`}>{row.status}</span></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default TableProd
