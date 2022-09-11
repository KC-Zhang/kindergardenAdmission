import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {FC, useEffect} from "react";

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'rooms',
    headerName: 'Rooms',
    type: 'string',
    width: 110,
    editable: false,
  },
  {
    field: 'programs',
    headerName: 'Programs',
    width: 160,
    sortable: false,
  },
  {
    field: 'DOB',
    headerName: 'DOB',
    type: 'date',
    width: 160,
    sortable: false,
  },
  {
    field: 'startDate',
    headerName: 'startDate',
    type: 'date',
    width: 160,
    sortable: false,
  },
  { field: 'id', headerName: 'ID', width: 90 },
];


const formatData = (data: string[][]) => {
  return data.slice(1).map((row, index) => {
    const newRow = {
      firstName: row[0],
      lastName: row[1],
      rooms: row[2],
      programs: row[3],
      DOB: new Date(row[5]),
      startDate: new Date(row[6]),
      id: index
    }
    return newRow;
  })
}

const CSVDataGrid:FC<{data:never[][]}> =({data})=> {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const rows = formatData(data)
    console.log(rows)
    setRows(rows)
  }, [data])
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default CSVDataGrid;