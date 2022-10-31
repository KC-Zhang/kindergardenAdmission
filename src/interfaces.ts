import {programAgeRange} from "./configs";

export type Program = keyof typeof programAgeRange;

export interface Student {
  firstName: string;
  lastName: string;
  room: string
  program: string;
  dateOfBirth: Date;
  startDate: Date;
  age: number;
  ageInDays: number;
}
export interface CSVRow {
  firstName: string;
  lastName: string;
  room: string
  program: string;
  dateOfBirth: Date;
  startDate: Date;
  id: number;
}


export interface StudentMovement {
  room: string;
  remainingStudents:Student[];
  graduatedStudents:Student[]
}