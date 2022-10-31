import {FC, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {CSVRow} from "../src/interfaces";
import {Button, FormLabel, Grid, Input, Select } from "@mui/material";
import {Text} from "@chakra-ui/react";


const AddAStudentForm: FC<{ addStudentRecordHandle: (student: Omit<CSVRow, "id">) => void, uniqueRooms: string[] }> = ({
                                                                                                                         addStudentRecordHandle,
                                                                                                                         uniqueRooms
                                                                                                                       }) => {
  console.log("uniqueRooms", uniqueRooms);
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    room: uniqueRooms[0],
    dateOfBirth: new Date(),
    startDate: new Date(),
    program: '',
  });
  useEffect(
    () => {
      setStudent({...student, room: uniqueRooms[0]});
    }, [uniqueRooms, setStudent]
  )

  const onsubmit = (e: any) => {
    e.preventDefault();
    addStudentRecordHandle(student);
    setStudent({
      firstName: '',
      lastName: '',
      room:  uniqueRooms[0],
      dateOfBirth: new Date(),
      startDate: new Date(),
      program: '',
    })
  }
  return (
    <form>
      <Grid container spacing={5} marginTop={0} marginLeft={0}>
        <div>
          <FormLabel sx={{marginLeft: 2, marginRight: 2}}>First Name</FormLabel>
          <Input type="text" value={student.firstName}
                 onChange={(e) => setStudent({...student, firstName: e.target.value})}/>
        </div>
        <div>
          <FormLabel sx={{marginLeft: 2, marginRight: 2}}>Last Name</FormLabel>
          <Input type="text" value={student.lastName}
                 onChange={(e) => setStudent({...student, lastName: e.target.value})}/>
        </div>
        <div>
          <FormLabel sx={{marginLeft: 2, marginRight: 2}}>Room</FormLabel>
          <select value={student.room} onChange={(e) => setStudent({...student, room: e.target.value})}>
            {uniqueRooms.map((room) => <option value={room} key={room}>{room}</option>)}
          </select>
        </div>
        <div>
          <FormLabel sx={{ marginRight: 2}}>Date of Birth</FormLabel>
          <DatePicker selected={student.dateOfBirth} onChange={(date:Date) => setStudent({...student, dateOfBirth: date})}/>
        </div>
        <Button
          variant="contained"
          onClick={onsubmit}

        >Add</Button>
      </Grid>
    </form>
  );
}


export default AddAStudentForm;