import {FC, useEffect} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {Student} from "../../src/interfaces";
import {columns} from "./common";

const OutputDataGrid:FC<{students:Student[], title:string}> =({students, title})=> {
  return (
    <Box sx={{ height: 400, width: '40%', marginBottom: 20 }}>
      <header style={{ height: 80, width: '100%', fontSize:"xxx-large"}}>
        {title} </header>
      <DataGrid
        rows={students}
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

export default OutputDataGrid;