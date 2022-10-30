import {Student} from "./interfaces";
import {programAgeRange} from "./configs";

const findKeysIncludedInKeyword = (obj: any, keyword: string) => {
  const keys = Object.keys(obj);
  const matchedKeys = keys.filter(key => {
    return keyword.includes(key);
  })
  return matchedKeys;
}

export const getStudentMovementsForARoom= (pickedDate:Date, room:string, students:Student[]) => {
  const roomStudents = students.filter(student => student.room === room)
  const studentsYoungerThanMaxAge = roomStudents.filter(student => {
    const room = student.room;
    console.log(programAgeRange)
    const ageRange = programAgeRange[findKeysIncludedInKeyword(programAgeRange, room)[0] as keyof typeof programAgeRange];
    return student.age < ageRange.max
  })
  const studentsOlderThanMaxAge = roomStudents.filter(student => {
    const room = student.room;
    const ageRange = programAgeRange[findKeysIncludedInKeyword(programAgeRange, room)[0] as keyof typeof programAgeRange];
    return student.age >= ageRange.max
  })
  return {remainingStudents:studentsYoungerThanMaxAge, graduatedStudents:studentsOlderThanMaxAge}
}