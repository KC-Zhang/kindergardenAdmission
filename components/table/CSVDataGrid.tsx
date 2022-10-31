import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {columns} from "./common";
import {CSVRow, Student} from "../../src/interfaces";
import AddAStudentForm from "../addAStudentForm";
import {Alert, Snackbar} from "@mui/material";

const formatData = (data: string[][]) => {
  return data.slice(1).map((row, index) => {
    const newRow: CSVRow = {
      firstName: row[0],
      lastName: row[1],
      room: row[2],
      program: row[3],
      dateOfBirth: new Date(row[5]),
      startDate: new Date(row[6]),
      id: index,
    };
    return newRow;
  });
};

const CSVDataGrid: FC<{ data: never[][]; title: string, setAddedStudentCSVRow:   Dispatch<SetStateAction<Omit<CSVRow, "id"> | undefined>>}> = (
  {
    data,
    title,
    setAddedStudentCSVRow
  }) => {
  const [rows, setRows] = React.useState<CSVRow[]>([]);
  const [uniqueRooms, setUniqueRooms] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const rows = formatData(data);
    setRows(rows);
    const uniqueRooms = [...new Set(rows.map((student) => student.room))];
    setUniqueRooms(uniqueRooms);
  }, [data]);

  const addStudentRecordHandle = (student: Omit<CSVRow, "id">) => {
    if (rows) {
      const newRows = [...rows, {...student, id: rows.length}];
      setAddedStudentCSVRow(student);
      setRows(newRows);
      setOpen(true);
    }
  }

  return (
    <div>
      <Box sx={{height: 400, width: "100%", marginBottom: 20}}>
        <header style={{height: 80, width: "100%", fontSize: "xxx-large"}}>
          {title}{" "}
        </header>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{newEditingApi: true}}
        />
        <AddAStudentForm addStudentRecordHandle={addStudentRecordHandle} uniqueRooms={uniqueRooms}></AddAStudentForm>
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
          <Alert severity="success">Successfully add a student</Alert>
        </Snackbar>
      </Box>

    </div>
  );

};

export default CSVDataGrid;
