import {Program} from "./interfaces";

export const programAgeRange = {
  'Baby': {
    min: 1,
    max: 2
  },
  'JK1': {
    min: 2,
    max: 3
  },
  'JK2': {
    min: 3,
    max: 4
  },
  'JK3': {
    min: 4,
    max: 5
  }
}
export const programs = Object.keys(programAgeRange) as Program[];

export const columnNumberMapping = {
  firstName: 0,
  lastName: 1,
  room: 2,
  program: 3,
  dateOfBirth: 5,
  startDate: 6,
}