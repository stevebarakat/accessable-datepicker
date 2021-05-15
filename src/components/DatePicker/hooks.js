import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  subDays,
  addDays
} from "date-fns";
import { chunk } from "lodash";

export const useGenerateMonth = (state) => {
  const daysInMonth = getDaysInMonth(state);
  const firstOfMonth = startOfMonth(state);
  const lastOfMonth = endOfMonth(state);
  // % 7 makes the dates 0-index, returns - 0 == sun, 6 == sat
  const startWeekday = getDay(startOfMonth(state));
  const endWeekday = getDay(endOfMonth(state));
  const daysLeft = 6 - endWeekday;

  let lastDaysOfPreviousMonth = [];
  let firstDaysOfNextMonth = [];

  const firstDayLastMonth = subDays(firstOfMonth, startWeekday);
  const firstDayNextMonth = addDays(lastOfMonth, 1);
  for (let i = 0; i < startWeekday; i++) {
    firstDaysOfNextMonth.push(getDate(addDays(firstDayLastMonth, i)));
  }

  for (let i = 0; i < daysLeft; i++) {
    firstDaysOfNextMonth.push(getDate(addDays(firstDayNextMonth, i)));
  }

  const gridDays = chunk(
    [
      ...lastDaysOfPreviousMonth.map((day) => setDate(firstDayLastMonth, day)),
      ...Array.from({ length: daysInMonth }, (_, i) =>
        setDate(state, i + 1)
      ),
      ...firstDaysOfNextMonth.map((day) => setDate(firstDayNextMonth, day)),
    ],
    7
  );
  return gridDays;
};
