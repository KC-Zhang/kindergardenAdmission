import {Program, Student} from "./interfaces";
import {columnNumberMapping, programs} from "./configs";

export const getMatchedPrograms = (programNameRaw:string) => {
  const matchedPrograms = programs.filter(program => {
    return programNameRaw.includes(program)
  })
  return matchedPrograms;
}


export const processCSVData = (csvData: string[][], selectedDate: Date) => {
  const studentsRaw = csvData.slice(1).map((row, index) => {
    const DOB = new Date(row[columnNumberMapping.dateOfBirth]);
    const age = calculateAge(DOB, selectedDate);
    return {
      firstName: row[columnNumberMapping.firstName],
      lastName: row[columnNumberMapping.lastName],
      room: row[columnNumberMapping.room],
      program: row[columnNumberMapping.program],
      dateOfBirth: DOB,
      startDate: new Date(row[columnNumberMapping.startDate]),
      id: index,
      age,
    }
  })
  try {
    const students = cleanupProgramNames(studentsRaw);
    return students;
  } catch (e) {
    console.log(e);
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