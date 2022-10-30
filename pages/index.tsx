import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import CSV from "../components/CSV";
import CSVDataGrid from "../components/table/CSVDataGrid";
import { getStudentMovementsForARoom } from "../src/calculationCore";
import {
  cleanupProgramNames,
  getMatchedPrograms,
  processCSVData,
} from "../src/dataCleaning";
import { Student, StudentMovement } from "../src/interfaces";
import OutputDataGrid from "../components/table/outputDatagrid";
import { Grid, Typography, Box } from "@mui/material";
import { programAgeRange } from "../src/configs";
import { sortBy } from "lodash";

const Home: NextPage = () => {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [data, setData] = useState<[][] | null>(null);
  const [studentMovements, setStudentMovements] = useState<StudentMovement[]>(
    []
  );

  useEffect(() => {
    if (data?.length && pickedDate) {
      const students: Student[] = processCSVData(data, pickedDate);
      const uniquePrograms = [
        ...new Set(students.map((student) => student.program)),
      ];
      const uniqueRooms = [...new Set(students.map((student) => student.room))];
      console.log(`uniquePrograms`, uniquePrograms);
      console.log(`uniqueRooms`, uniqueRooms);
      const studentMovementsForAllRooms = uniqueRooms.map((roomName) => {
        return {
          room: roomName,
          ...getStudentMovementsForARoom(pickedDate, roomName, students),
        };
      });
      const sorted = sortBy(studentMovementsForAllRooms, [
        (studentMovement) =>
          programAgeRange[getMatchedPrograms(studentMovement.room)[0]]?.min ||
          0,
        "room",
      ]);
      setStudentMovements(sorted);
      console.log(`newStudentStats`, studentMovementsForAllRooms);
    }
  }, [data, pickedDate]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <Typography variant="h6" textAlign="center">
          {" "}
          Welcome to{" "}
        </Typography>
        <Typography variant="h4" textAlign="center">
          Kindergarten Admission Scheduler
        </Typography>
        <Box alignSelf="center" marginTop={5} marginBottom={2}>
          <Typography variant="h6" textAlign="center" color="red">
            Select a date
          </Typography>
        </Box>
        <Box alignSelf="center" marginBottom={2}>
          <DatePicker
            selected={pickedDate}
            onChange={(date: Date) => setPickedDate(date)}
          />
        </Box>
        <Typography textAlign="center" variant="h6">
          {pickedDate
            ? "Current Target Date: " + pickedDate.toDateString()
            : null}
        </Typography>

        <Box marginTop={5} paddingX={50} marginBottom={5}>
          <text>Upload CSV file</text>
          <CSV setData={setData}></CSV>
        </Box>
        {data ? (
          <CSVDataGrid data={data} title={"Raw Input Data"}></CSVDataGrid>
        ) : (
          <></>
        )}
        {studentMovements.length ? (
          studentMovements.map((studentMovement, index) => {
            return (
              <>
                <Typography variant="h5" textAlign="center">
                  {studentMovement.room}
                </Typography>
                <Grid container spacing={2} key={index}>
                  <Grid
                    item
                    xs={6}
                    textAlign="center"
                    marginTop={5}
                    marginBottom={0}
                  >
                    <OutputDataGrid
                      students={studentMovement.remainingStudents}
                      title={"Remaining"}
                    ></OutputDataGrid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    textAlign="center"
                    marginTop={5}
                    marginBottom={0}
                  >
                    <OutputDataGrid
                      students={studentMovement.graduatedStudents}
                      title={"Graduated"}
                    ></OutputDataGrid>
                  </Grid>
                </Grid>
              </>
            );
          })
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default Home;
