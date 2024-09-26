import React from 'react'
import './dataTable.scss'
import { DATA_GRID_PROPS_DEFAULT_VALUES, DataGrid, GridColDef } from '@mui/x-data-grid';
import { userRows ,userColumns} from './../../dataSource';

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      /*   on pet ajouter aussi render au lieu de valueGetter

        renderCell: (params.row)=>{
            return(
                <>
                    <span>{params.row.lastName}</span>
                    <p>{params.row.age}</p>
                </>
            )
            }
      */ 
//     },
//   ];
  



const DataTable = () => {
    const actionclumns = [
        { field: 'action', headerName: 'Action', width: 190 , renderCell:()=>{
            return(
                <div className="cellAction">
                    <div >
                        <span className="viewButton">view</span>
                    </div>
                    <div >
                    <span className="deleteButton">delete</span>
                    </div>
                </div>
            )
        } },
    ]
  return (
    <div style={{ height: '89.5vh', width: '98.9%' }} className='dataTable'>
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionclumns)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
      />
    </div>
    
  )
}

export default DataTable
