import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import CSV from "../components/CSV";
import CSVDataGrid from "../components/table/CSVDataGrid";
import {getStudentMovementsForARoom} from "../src/calculationCore";
import {cleanupProgramNames, processCSVData} from "../src/dataCleaning";
import {Student, StudentMovement} from "../src/interfaces";
import OutputDataGrid from "../components/table/outputDatagrid";
import {Box, Flex, Grid, HStack, Spacer, VStack} from '@chakra-ui/react'



const Home: NextPage = () => {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [data, setData] = useState<[][]|null>(null);
  const [studentMovements, setStudentMovements] = useState<StudentMovement[]>([]);

  useEffect(() => {
    if (data?.length && pickedDate) {
      const students:Student[] = processCSVData(data, pickedDate);
      const uniquePrograms = [...new Set(students.map(student => student.program))];
      const uniqueRooms = [...new Set(students.map(student => student.room))];
      console.log(`uniquePrograms`, uniquePrograms);
      console.log(`uniqueRooms`, uniqueRooms);
      const studentMovementsForAllRooms = uniqueRooms.map(roomName => {
        return {
          room: roomName,
          ...getStudentMovementsForARoom(pickedDate, roomName,students)
        }
      });
      setStudentMovements(studentMovementsForAllRooms);
      console.log(`newStudentStats`, studentMovementsForAllRooms);
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
        {data
          ? <CSVDataGrid data={data} title={'Raw Input Data'}></CSVDataGrid>
          : <></>
        }

        {/*<Flex>*/}
        {/*  <Box p='4' bg='red.400'>*/}
        {/*    Box 1*/}
        {/*  </Box>*/}
        {/*  <Spacer />*/}
        {/*  <Box p='4' bg='green.400'>*/}
        {/*    Box 2*/}
        {/*  </Box>*/}
        {/*</Flex>*/}
        <VStack>
        {studentMovements.length
          ? studentMovements.map((studentMovement, index) => {
            return (
              <HStack key={index} style={{width:'100%'}}>
                <Box>
                        <OutputDataGrid students={studentMovement.remainingStudents} title={studentMovement.room}></OutputDataGrid>
                </Box>
                <Box>
                        <OutputDataGrid students={studentMovement.graduatedStudents} title={studentMovement.room}></OutputDataGrid>
                </Box>
              </HStack>)
          })
          : <></>
        }
        </VStack>
      </main>
    </div>
  )
}

export default Home
