import {Student} from "./interfaces";
import {programAgeRange} from "./configs";


export const getStudentMovementsForARoom= (pickedDate:Date, room:string, students:Student[]) => {
  const roomStudents = students.filter(student => student.room === room)
  const studentsYoungerThanMaxAge = roomStudents.filter(student => {
    const program = student.program;
    const ageRange = programAgeRange[program];
    return student.age < ageRange.max
  })
  const studentsOlderThanMaxAge = roomStudents.filter(student => {
    const program = student.program;
    const ageRange = programAgeRange[program];
    return student.age >= ageRange.max
  })
  return {remainingStudents:studentsYoungerThanMaxAge, graduatedStudents:studentsOlderThanMaxAge}
}