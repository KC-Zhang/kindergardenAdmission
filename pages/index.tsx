import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Slider} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import CSV from "../components/CSV";
import { DataGrid } from '@mui/x-data-grid';
import CSVDataGrid from "../components/CSVDataGrid";
import {getRemainingAndGraduatedStudentAmounts} from "../src/calculationCore";
import {cleanupProgramNames, processCSVData} from "../src/dataCleaning";
import {Student} from "../src/interfaces";


const Home: NextPage = () => {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [data, setData] = useState([[]]);

  useEffect(() => {
    if (data.length, pickedDate) {
      const students:Student[] = processCSVData(data, pickedDate);
      const uniquePrograms = [...new Set(students.map(student => student.program))];
      const uniqueRooms = [...new Set(students.map(student => student.room))];
      console.log(`uniquePrograms`, uniquePrograms);
      console.log(`uniqueRooms`, uniqueRooms);
      const newStudentStats = uniqueRooms.map(roomName => {
        return getRemainingAndGraduatedStudentAmounts(pickedDate, roomName, students);
        }
      )
      console.log(`newStudentStats`, newStudentStats);
    }
  }, [data, pickedDate])

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to kindergarten admission scheduler
        </h1>

        <div className={styles.title} >
          <div>
            <DatePicker
              selected={pickedDate} onChange={(date:Date) => setPickedDate(date)} />
            {pickedDate?.toDateString()}
          </div>

        </div>

        <div className={styles.title}>
          Upload CSV file
        </div>
        <CSV setData={setData}></CSV>
        <CSVDataGrid data={data}></CSVDataGrid>

      </main>
    </div>
  )
}

export default Home
