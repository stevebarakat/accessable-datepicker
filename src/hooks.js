import React, { useEffect, useRef } from 'react';
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  subDays,
  addDays,
} from "date-fns";
import { chunk } from "lodash";

const day0 = "Sunday";
const day1 = "Monday";
const day2 = "Tuesday";
const day3 = "Wednesday";
const day4 = "Thursday";
const day5 = "Friday";
const day6 = "Saturday";

export const useGenerateDays = ({length}) => (
  <>
    <tr role="row">
      <th role="columnheader" aria-label={day0}>
        <abbr title={day0}>{day0.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day1}>
        <abbr title={day1}>{day1.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day2}>
        <abbr title={day2}>{day2.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day3}>
        <abbr title={day3}>{day3.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day4}>
        <abbr title={day4}>{day4.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day5}>
        <abbr title={day5}>{day5.slice(0, length)}</abbr>
      </th>
      <th role="columnheader" aria-label={day6}>
        <abbr title={day6}>{day6.slice(0, length)}</abbr>
      </th>
    </tr>
  </>
);

export const useGenerateDates = (state) => {
  const daysInMonth = getDaysInMonth(state);
  const firstOfMonth = startOfMonth(state);
  const lastOfMonth = endOfMonth(state);
  const startWeekday = getDay(startOfMonth(state));
  const endWeekday = getDay(endOfMonth(state));
  const daysLeft = 6 - endWeekday;

  let previous = [];
  let next = [];

  const firstDayLastMonth = subDays(firstOfMonth, startWeekday);
  const firstDayNextMonth = addDays(lastOfMonth, 1);
  for (let i = 0; i < startWeekday; i++) {
    previous.push(getDate(addDays(firstDayLastMonth, i)));
  }

  for (let i = 0; i < daysLeft; i++) {
    next.push(getDate(addDays(firstDayNextMonth, i)));
  }
  // concatenate previous, current, and next month dates 
  // dividing by 7, split into week arrays w/lodash's chunk
  const gridDays = chunk(
    [...previous.map(day => setDate(firstDayLastMonth, day)),
    ...Array.from({ length: daysInMonth },
      (_, i) => setDate(state, i + 1)),
    ...next.map(day => setDate(firstDayNextMonth, day))], 7);

  return gridDays;
};
