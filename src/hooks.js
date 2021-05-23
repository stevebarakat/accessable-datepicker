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

export const useGenerateWeekdays = () => (
  <>
    <tr role="row">
      <th className="header" role="columnheader" aria-label="Sunday">
        <abbr title="Sunday">Su</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Monday">
        <abbr title="Monday">Mo</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Tuesday">
        <abbr title="Tuesday">Tu</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Wednesday">
        <abbr title="Wednesday">We</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Thursday">
        <abbr title="Thursday">Th</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Friday">
        <abbr title="Friday">Fr</abbr>
      </th>
      <th className="header" role="columnheader" aria-label="Saturday">
        <abbr title="Saturday">Sa</abbr>
      </th>
    </tr>
  </>
);

export const useGenerateMonth = (state) => {
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
    console.log(state);
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
