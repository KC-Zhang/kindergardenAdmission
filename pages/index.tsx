import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Slider} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import CSV from "../components/CSV";
import { DataGrid } from '@mui/x-data-grid';
import CSVDataGrid from "../components/CSVDataGrid";

const calculateStudents = (data: string[][], date:Date) => {
  const students = data.slice(1).map((row) => {
    const DOB = new Date(row[5]);
    const startDate = new Date(row[6]);
    if (DOB > date || startDate > date) {
      return 0;
    }
    return 1;
  }).reduce((a, b) => a + b, 0);
  return students;
}
const Home: NextPage = () => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [data, setData] = useState([[]]);
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
            {pickedDate.toLocaleDateString()}
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
