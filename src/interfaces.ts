import {programAgeRange} from "./configs";

export type Program = keyof typeof programAgeRange;

export interface Student {
  firstName: string;
  lastName: string;
  room: string
  program: Program;
  dateOfBirth: Date;
  startDate: Date;
  age: number;
}

export interface StudentMovement {
  room: string;
  remainingStudents:Student[];
  graduatedStudents:Student[]
}