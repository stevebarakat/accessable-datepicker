import {
  format,
  formatISO,
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
    case 'SET_DATE':
      return action.payload;
    case 'SET_PREVIOUS_YEAR':
      const previousYear = subYears(state, 1);
      return startOfMonth(previousYear);
    case 'SET_NEXT_YEAR':
      const nextYear = addYears(state, 1);
      return startOfMonth(nextYear);
    case 'SET_PREVIOUS_MONTH':
      const previousMonth = subMonths(state, 1);
      return startOfMonth(previousMonth);
    case 'SET_NEXT_MONTH':
      const nextMonth = addMonths(state, 1);
      return startOfMonth(nextMonth);
    case 'SET_PREVIOUS_DAY':
      const previousDay = subDays(state, 1);
      return previousDay;
    case 'SET_NEXT_DAY':
      const nextDay = addDays(state, 1);
      return nextDay;
    case 'SET_PREVIOUS_WEEK':
      const previousWeek = subWeeks(state, 1);
      return previousWeek;
    case 'SET_NEXT_WEEK':
      const nextWeek = addWeeks(state, 1);
      return nextWeek;
    case 'SET_DATE_PREVIOUS_MONTH':
      const datePreviousMonth = subMonths(state, 1);
      return datePreviousMonth;
    case 'SET_DATE_NEXT_MONTH':
      const dateNextMonth = addMonths(state, 1);
      return dateNextMonth;
    case 'SET_DATE_PREVIOUS_YEAR':
      const datePreviousYear = subYears(state, 1);
      return datePreviousYear;
    case 'SET_DATE_NEXT_YEAR':
      const dateNextYear = addYears(state, 1);
      return dateNextYear;
    case 'SET_MONTH_START':
      const monthStart = startOfMonth(state);
      return monthStart;
    case 'SET_MONTH_END':
      const monthEnd = endOfMonth(state);
      return monthEnd;
    default:
      throw new Error();
  }
}