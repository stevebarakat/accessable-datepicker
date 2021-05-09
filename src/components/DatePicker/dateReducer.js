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

export default function dateReducer(state, action) {
  switch (action.type) {
    case 'SET_NEXT_YEAR':
      console.log("buu");
      return { selectedDate: action.payload };
    case 'SET_PREVIOUS_YEAR':
      return { selectedDate: action.payload };
    case 'SET_PREVIOUS_MONTH':
      return { selectedDate: action.payload };
    case 'SET_NEXT_MONTH':
      return { selectedDate: action.payload };
    default:
      throw new Error();
  }
}