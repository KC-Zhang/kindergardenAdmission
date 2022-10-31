import {CSVRow, Program, Student} from "./interfaces";
import {columnNumberMapping, programs} from "./configs";
import {expressionStatement} from "@babel/types";

export const getMatchedPrograms = (programNameRaw:string) => {
  const matchedPrograms = programs.filter(program => {
    return programNameRaw.includes(program)
  })
  return matchedPrograms;
}


export const CSVRowToStudent = (row: Omit<CSVRow, "id">,  selectedDate: Date): Student => {
  const age = calculateAge(row.dateOfBirth, selectedDate)
  const ageInDays = Math.floor((selectedDate.getTime() - row.dateOfBirth.getTime()) / (1000 * 3600 * 24));
  return {
    firstName: row.firstName,
    lastName: row.lastName,
    room: row.room,
    program: row.program,
    dateOfBirth: row.dateOfBirth,
    startDate: row.startDate,
    age: age,
    ageInDays: ageInDays,
  }
}
export const processCSVData = (csvData: string[][], selectedDate: Date) => {
  const studentsRaw = csvData.slice(1).map((row, index) => {
    const DOB = new Date(row[columnNumberMapping.dateOfBirth]);
    const age = calculateAge(DOB, selectedDate);
    const ageInDays = Math.floor((selectedDate.getTime() - DOB.getTime()) / (1000 * 3600 * 24));
    return {
      firstName: row[columnNumberMapping.firstName],
      lastName: row[columnNumberMapping.lastName],
      room: row[columnNumberMapping.room],
      program: row[columnNumberMapping.program],
      dateOfBirth: DOB,
      startDate: new Date(row[columnNumberMapping.startDate]),
      id: index,
      age,
      ageInDays
    }
  })
  try {
    const students = cleanupProgramNames(studentsRaw);
    return students;
  } catch (e) {
    return [];
  }
}


const calculateAge = (DOB: Date, selectedDate: Date) => {
  let age = selectedDate.getFullYear() - DOB.getFullYear();
  const m = selectedDate.getMonth() - DOB.getMonth();
  if (m < 0 || (m === 0 && selectedDate.getDate() < DOB.getDate())) {
    age--;
  }
  return age;
}

export const cleanupProgramNames = (students: any[]) => {
  const cleanedStudents = students.map(student => {
    return student as Student;
  })
  return cleanedStudents;
}