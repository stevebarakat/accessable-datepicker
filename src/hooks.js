import {
  getDay,
  getDate,
  setDate,
  addDays,
  subDays,
  endOfMonth,
  startOfMonth,
  getDaysInMonth
} from "date-fns";
import { chunk } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const useGenerateDays = ({ length }) => {
  let arr = [];
  let day = null;
  for (let i = 0; i <= 6; i++) {
    switch (i) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        Error("Please supply a day");
    }
    arr.push(
      <th key={uuidv4()} role="columnheader" aria-label={day}>
        <abbr title={day}>{day.slice(0, length)}</abbr>
      </th>
    );
  }
  return <tr>{arr}</tr>;
};

export const useGenerateDates = (state) => {
  const daysInMonth = getDaysInMonth(state); // number of days in selected month
  const firstOfMonth = startOfMonth(state); // first date of selected month
  const lastOfMonth = endOfMonth(state); // last date of selected month
  const startWeekday = getDay(startOfMonth(state)); // numeric value (0 - 6) for first day of month
  const endWeekday = getDay(endOfMonth(state)); // numeric value (0 - 6) for last day of month
  const daysLeft = 6 - endWeekday; // leftover calendar cells
  const firstDayLastMonth = subDays(firstOfMonth, startWeekday); // subtract (day number value) from first day of month to calclate which date of previous month to start calendar with
  const firstDayNextMonth = addDays(lastOfMonth, 1); // add one day to last day of current month to get first date of next month

  // create array of previous month's spill over
  let previous = [];
  for (let i = 0; i < startWeekday; i++) {
    previous.push(getDate(addDays(firstDayLastMonth, i)));
  }
  // create array of next month's spill over
  let next = [];
  for (let i = 0; i < daysLeft; i++) {
    next.push(getDate(addDays(firstDayNextMonth, i)));
  }
  // combine previous, current, and next month dates
  const gridDays = chunk(
    // split into week arrays w/lodash's chunk
    [
      ...previous.map((day) => setDate(firstDayLastMonth, day)),
      ...Array.from({ length: daysInMonth }, (_, i) => setDate(state, i + 1)),
      ...next.map((day) => setDate(firstDayNextMonth, day))
    ],
    7
  ); // divide by 7

  return gridDays;
};
