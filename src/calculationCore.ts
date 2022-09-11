import {Student} from "./interfaces";
import {programAgeRange} from "./configs";


export const getStudentMovementsForARoom= (pickedDate:Date, room:string, students:Student[]) => {
  const roomStudents = students.filter(student => student.room === room)
  const studentWithinAgeRange = roomStudents.filter(student => {
    const program = student.program;
    const ageRange = programAgeRange[program];
    console.log('student', student, ageRange)
    return student.age >= ageRange.min && student.age <= ageRange.max
  })
  const studentOutsideAgeRange = roomStudents.filter(student => {
    const program = student.program;
    const ageRange = programAgeRange[program];
    return student.age < ageRange.min || student.age > ageRange.max
  })
  return {remainingStudents:studentWithinAgeRange, graduatedStudents:studentOutsideAgeRange}
}