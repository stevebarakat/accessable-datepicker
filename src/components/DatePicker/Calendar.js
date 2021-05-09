import React, { useState, useReducer  } from "react";
import dateReducer from './dateReducer';

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
import { chunk } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

const Calendar = ({ date, handleSelectDate, closeCalendar }) => {
  const [state, dispatch] = useReducer(dateReducer, {selectedDate: new Date(date)});

  const setPreviousMonth = () => {
    const previousMonth = subMonths(state.selectedDate, 1);
    dispatch({type: "SET_PREVIOUS_MONTH", payload: startOfMonth(previousMonth)});
  };

  const setNextMonth = () => {
    const nextMonth = addMonths(state.selectedDate, 1);
    dispatch({type: "SET_NEXT_MONTH", payload: startOfMonth(nextMonth)});
  };

  const setPreviousYear = () => {
    const previousYear = subYears(state.selectedDate, 1);
    dispatch({type: "SET_PREVIOUS_YEAR", payload: startOfMonth(previousYear)});
  };

  const setNextYear = () => {
    const nextYear = addYears(state.selectedDate, 1);
    dispatch({type: "SET_NEXT_YEAR", payload: startOfMonth(nextYear)})
  };

  const handleKeyPress = (e, cb) => {
    const charCode = e.charCode;
    if (charCode === 13 || charCode === 32) {
      cb();
    }
  };

  // const setPreviousDay = () => {
  //   const previousDay = subDays(state.selectedDate, 1);
  //   setSelectedDate(previousDay);
  // };

  // const setNextDay = () => {
  //   const nextDay = addDays(state.selectedDate, 1);
  //   setSelectedDate(nextDay);
  // };

  // const setPreviousWeek = () => {
  //   const previousWeek = subWeeks(state.selectedDate, 1);
  //   setSelectedDate(previousWeek);
  // };

  // const setNextWeek = () => {
  //   const nextWeek = addWeeks(state.selectedDate, 1);
  //   setSelectedDate(nextWeek);
  // };

  // const setDatePreviousMonth = () => {
  //   setSelectedDate(subMonths(state.selectedDate, 1));
  // };

  // const setDateNextMonth = () => {
  //   setSelectedDate(addMonths(state.selectedDate, 1));
  // };

  // const setDatePreviousYear = () => {
  //   setSelectedDate(subYears(state.selectedDate, 1));
  // };

  // const setDateNextYear = () => {
  //   setSelectedDate(addYears(state.selectedDate, 1));
  // };

  // const setMonthStart = () => {
  //   setSelectedDate(startOfMonth(state.selectedDate));
  // };

  // const setMonthEnd = () => {
  //   setSelectedDate(endOfMonth(state.selectedDate));
  // };

  const generateMonth = () => {
    const daysInMonth = getDaysInMonth(state.selectedDate);
    // returns - Mon Mar 01 2021 00:00:00 GMT-0500 (Eastern Standard Time)
    const firstOfMonth = startOfMonth(state.selectedDate);
    const lastOfMonth = endOfMonth(state.selectedDate);
    // % 7 makes the dates 0-index, returns - 0 == sun, 6 == sat
    const startWeekday = getDay(startOfMonth(state.selectedDate));
    const endWeekday = getDay(endOfMonth(state.selectedDate));
    const daysLeft = 6 - endWeekday;

    let previous = [];
    let next = [];

    const firstDayLastMonth = subDays(firstOfMonth, startWeekday);
    const firstDayNextMonth = addDays(lastOfMonth, 1);
    console.log(firstDayNextMonth) //Sun Apr 25 2021 00:00:00 GMT-0400
    for (let i = 0; i < startWeekday; i++) {
      previous.push(getDate(addDays(firstDayLastMonth, i)));
    }

    for (let i = 0; i < daysLeft; i++) {
      next.push(getDate(addDays(firstDayNextMonth, i)));
    }

    const gridDays = chunk(
      [
        ...previous.map((day) => setDate(firstDayLastMonth, day)),
        ...Array.from({ length: daysInMonth }, (_, i) =>
          setDate(state.selectedDate, i + 1)
        ),
        ...next.map((day) => setDate(firstDayNextMonth, day)),
      ],
      7
    );
    return gridDays;
  };

  // const handleTableKeyPress = (e) => {
  //   const keyCode = e.keyCode;
  //   // Check if control key was pressed
  //   const control = e.ctrlKey;
  //   // const control = e.shiftKey;
  //   switch (keyCode) {
  //     case 13: //Enter
  //       handleSelectDate(format(state.selectedDate, "yyyy-MM-dd"));
  //       return;
  //     case 27: //Esc
  //       closeCalendar();
  //       return;
  //     case 32: //Space
  //       handleSelectDate(format(state.selectedDate, "yyyy-MM-dd"));
  //       return;
  //     case 33: //Page Up
  //       control ? setDatePreviousYear() : setDatePreviousMonth();
  //       return;
  //     case 34: //Page Down
  //       control ? setDateNextYear() : setDateNextMonth();
  //       return;
  //     case 35: //End
  //       setMonthEnd();
  //       return;
  //     case 36: //Home
  //       setMonthStart();
  //       return;
  //     case 37: //Left
  //       setPreviousDay();
  //       return;
  //     case 38: //Up
  //       setPreviousWeek();
  //       return;
  //     case 39: //Right
  //       setNextDay();
  //       return;
  //     case 40: //Down
  //       setNextWeek();
  //       return;
  //     default:
  //       return;
  //   }
  // };

  const handleDateSelection = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    handleSelectDate(dateString);
  };

  return (
    <div className="calendar">
      <div className="title">
        <div className="icons">
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={setPreviousYear}
            onKeyPress={(e) => handleKeyPress(e, setPreviousYear)}
            role="button"
            aria-label="Previous year"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </div>
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={setPreviousMonth}
            onKeyPress={(e) => handleKeyPress(e, setPreviousMonth)}
            role="button"
            aria-label="Previous month"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </div>
        <div className="month" role="heading">
          <b>{format(state.selectedDate, "MMMM yyyy")}</b>
        </div>
        <div className="icons">
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={setNextMonth}
            onKeyPress={(e) => handleKeyPress(e, setNextMonth)}
            role="button"
            aria-label="Next year"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={setNextYear}
            onKeyPress={(e) => handleKeyPress(e, setNextYear)}
            role="button"
            aria-label="Next year"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
        </div>
      </div>
      <table
        id="grid"
        tabIndex="0"
        // onKeyDown={handleTableKeyPress}
        role="grid"
        aria-label="Month"
      >
        <thead>
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
        </thead>
        <tbody>
          {generateMonth().map((week, i) => (
            <tr className="week" key={`week-${i}`} role="row">
              {week.map((day, i) =>
                day ? (
                  <td
                    className={`cell${isEqual(state.selectedDate, day) ? " active" : ""
                      }`}
                    key={`day-cell-${i}`}
                    onClick={() => handleDateSelection(day)}
                    role="gridcell"
                    aria-selected={isEqual(state.selectedDate, day)}
                  >
                    {getDate(day)}
                  </td>
                ) : (
                  <td className="empty" key={`day-cell-${i}`}>
                    &nbsp;
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
