import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import CSV from "../components/CSV";
import CSVDataGrid from "../components/table/CSVDataGrid";
import { getStudentMovementsForARoom } from "../src/calculationCore";
import {cleanupProgramNames, getMatchedPrograms, processCSVData} from "../src/dataCleaning";
import { Student, StudentMovement } from "../src/interfaces";
import OutputDataGrid from "../components/table/outputDatagrid";
import { Grid } from "@mui/material";
import {programAgeRange} from "../src/configs";
import {sortBy} from "lodash";

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
      const sorted =  sortBy(studentMovementsForAllRooms, [(studentMovement) => programAgeRange[getMatchedPrograms(studentMovement.room)[0]]?.min||0, 'room']);
      setStudentMovements(sorted);
      console.log(`newStudentStats`, studentMovementsForAllRooms);
    }
  }, [data, pickedDate]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 style={{ textAlign: "center" }}> Welcome to </h2>
        <h1 className={styles.title}>Kindergarten Admission Scheduler</h1>

        <div className={styles.title}>
          <DatePicker
            selected={pickedDate}
            onChange={(date: Date) => setPickedDate(date)}
          />
          {pickedDate?
            'Target Date: ' + pickedDate.toDateString()
            :null}
        </div>

        <h1>Upload CSV file</h1>
        <CSV setData={setData}></CSV>
        {data ? (
          <CSVDataGrid data={data} title={"Raw Input Data"}></CSVDataGrid>
        ) : (
          <></>
        )}

        {studentMovements.length ? (
          studentMovements.map((studentMovement, index) => {
            return (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <OutputDataGrid
                    students={studentMovement.remainingStudents}
                    title={studentMovement.room + " Remaining"}
                  ></OutputDataGrid>
                </Grid>
                <Grid item xs={6}>
                  <OutputDataGrid
                    students={studentMovement.graduatedStudents}
                    title={studentMovement.room + " Graduated"}
                  ></OutputDataGrid>
                </Grid>
              </Grid>
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
