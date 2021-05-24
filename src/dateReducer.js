import {
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  endOfMonth,
  subWeeks,
  addWeeks,
  subDays,
  addDays
} from "date-fns";

export default function dateReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      return { focusedDate: action.payload, selectedDate: action.payload };
    case 'SET_PREVIOUS_YEAR':
      const previousYear = subYears(state.focusedDate, 1);
      return { ...state, focusedDate: startOfMonth(previousYear) };
    case 'SET_NEXT_YEAR':
      const nextYear = addYears(state.focusedDate, 1);
      return { ...state, focusedDate: startOfMonth(nextYear) };
    case 'SET_PREVIOUS_MONTH':
      const previousMonth = subMonths(state.focusedDate, 1);
      return { ...state, focusedDate: startOfMonth(previousMonth) };
    case 'SET_NEXT_MONTH':
      const nextMonth = addMonths(state.focusedDate, 1);
      return { ...state, focusedDate: startOfMonth(nextMonth) };
    case 'SET_PREVIOUS_DAY':
      const previousDay = subDays(state.focusedDate, 1);
      return { ...state, focusedDate: previousDay };
    case 'SET_NEXT_DAY':
      const nextDay = addDays(state.focusedDate, 1);
      return { ...state, focusedDate: nextDay };
    case 'SET_PREVIOUS_WEEK':
      const previousWeek = subWeeks(state.focusedDate, 1);
      return { ...state, focusedDate: previousWeek };
    case 'SET_NEXT_WEEK':
      const nextWeek = addWeeks(state.focusedDate, 1);
      return { ...state, focusedDate: nextWeek };
    case 'SET_DATE_PREVIOUS_MONTH':
      const datePreviousMonth = subMonths(state.focusedDate, 1);
      return { ...state, focusedDate: datePreviousMonth };
    case 'SET_DATE_NEXT_MONTH':
      const dateNextMonth = addMonths(state.focusedDate, 1);
      return { ...state, focusedDate: dateNextMonth };
    case 'SET_DATE_PREVIOUS_YEAR':
      const datePreviousYear = subYears(state.focusedDate, 1);
      return { ...state, focusedDate: datePreviousYear };
    case 'SET_DATE_NEXT_YEAR':
      const dateNextYear = addYears(state.focusedDate, 1);
      return { ...state, focusedDate: dateNextYear };
    case 'SET_MONTH_START':
      const monthStart = startOfMonth(state.focusedDate);
      return { ...state, focusedDate: monthStart };
    case 'SET_MONTH_END':
      const monthEnd = endOfMonth(state.focusedDate);
      return { ...state, focusedDate: monthEnd };
    default:
      throw new Error();
  }
}