import * as React from 'react';
import {FC, useEffect} from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./common";


const formatData = (data: string[][]) => {
  return data.slice(1).map((row, index) => {
    const newRow = {
      firstName: row[0],
      lastName: row[1],
      room: row[2],
      program: row[3],
      dateOfBirth: new Date(row[5]),
      startDate: new Date(row[6]),
      id: index
    }
    return newRow;
  })
}

const CSVDataGrid:FC<{data:never[][], title:string}> =({data, title})=> {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const rows = formatData(data)
    console.log(rows)
    // @ts-ignore20
    setRows(rows)
  }, [data])
  return (
    <Box sx={{ height: 400, width: '80%', marginBottom:20}}>
      <header style={{ height: 80, width: '100%', fontSize:"xxx-large"}}>
        {title} </header>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default CSVDataGrid;