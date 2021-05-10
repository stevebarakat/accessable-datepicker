import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays
} from "date-fns";

export default function selectedDateReducer(state, action) {
  switch (action.type) {
    case 'SET_NEXT_YEAR':
      console.log("buu");
      return action.payload;
    case 'SET_PREVIOUS_YEAR':
      return action.payload;
    case 'SET_PREVIOUS_MONTH':
      return action.payload;
    case 'SET_NEXT_MONTH':
      return action.payload;
    default:
      throw new Error();
  }
}