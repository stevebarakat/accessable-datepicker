import React, { useReducer } from "react";
import selectedDateReducer from './selectedDateReducer';

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

const Calendar = ({ date, handleSelectDate, handleSelect, closeCalendar }) => {
  const [state, dispatch] = useReducer(selectedDateReducer, new Date(date));



  const handleKeyPress = (e, cb) => {
    const charCode = e.keyCode;
    if (charCode === 13 || charCode === 32) {
      cb();
    }
  };

  const generateMonth = () => {
    const daysInMonth = getDaysInMonth(state);
    // returns - Mon Mar 01 2021 00:00:00 GMT-0500 (Eastern Standard Time)
    const firstOfMonth = startOfMonth(state);
    const lastOfMonth = endOfMonth(state);
    // % 7 makes the dates 0-index, returns - 0 == sun, 6 == sat
    const startWeekday = getDay(startOfMonth(state));
    const endWeekday = getDay(endOfMonth(state));
    const daysLeft = 6 - endWeekday;

    let previous = [];
    let next = [];

    const firstDayLastMonth = subDays(firstOfMonth, startWeekday);
    const firstDayNextMonth = addDays(lastOfMonth, 1);
    console.log(firstDayNextMonth); //Sun Apr 25 2021 00:00:00 GMT-0400
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
          setDate(state, i + 1)
        ),
        ...next.map((day) => setDate(firstDayNextMonth, day)),
      ],
      7
    );
    return gridDays;
  };

  const handleTableKeyPress = (e) => {
    const keyCode = e.keyCode;
    // Check if control key was pressed
    const control = e.ctrlKey;
    // const control = e.shiftKey;
    switch (keyCode) {
      case 13: //Enter
        handleSelectDate(format(state, "yyyy-MM-dd"));
        return;
      case 27: //Esc
        closeCalendar();
        return;
      case 32: //Space
        handleSelectDate(format(state, "yyyy-MM-dd"));
        return;
      case 33: //Page Up
        control ?
          dispatch({ type: "SET_DATE_PREVIOUS_YEAR" }) :
          dispatch({ type: "SET_DATE_PREVIOUS_MONTH" });
        return;
      case 34: //Page Down
        control ?
          dispatch({ type: "SET_DATE_NEXT_YEAR" }) :
          dispatch({ type: "SET_DATE_NEXT_MONTH" });
        return;
      case 35: //End
        dispatch({ type: "SET_MONTH_END" });
        return;
      case 36: //Home
        dispatch({ type: "SET_MONTH_START" });
        return;
      case 37: //Left
        dispatch({ type: "SET_PREVIOUS_DAY" });
        return;
      case 38: //Up
        dispatch({ type: "SET_PREVIOUS_WEEK" });
        return;
      case 39: //Right
        dispatch({ type: "SET_NEXT_DAY" });
        return;
      case 40: //Down
        dispatch({ type: "SET_NEXT_WEEK" });
        return;
      default:
        return;
    }
  };

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
            onClick={() => dispatch({ type: "SET_PREVIOUS_YEAR" })}
            onKeyPress={(e) => handleKeyPress(e, dispatch({ type: "SET_PREVIOUS_YEAR" }))}
            role="button"
            aria-label="Previous year"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </div>
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={() => dispatch({ type: "SET_PREVIOUS_MONTH" })}
            onKeyPress={(e) => handleKeyPress(e, dispatch({ type: "SET_PREVIOUS_MONTH" }))}
            role="button"
            aria-label="Previous month"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </div>
        <div className="month" role="heading" aria-level="2">
          <b>{format(state, "MMMM yyyy")}</b>
        </div>
        <div className="icons">
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={() => dispatch({ type: "SET_NEXT_MONTH" })}
            onKeyPress={(e) => handleKeyPress(e, dispatch({ type: "SET_NEXT_MONTH" }))}
            role="button"
            aria-label="Next month"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
          <div
            className="iconContainer"
            tabIndex="0"
            onClick={() => dispatch({ type: "SET_NEXT_YEAR" })}
            onKeyPress={(e) => handleKeyPress(e, dispatch({ type: "SET_NEXT_YEAR" }))}
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
        onKeyDown={handleTableKeyPress}
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
                    className={`cell${isEqual(state, day) ? " active" : ""
                      }`}
                    key={`day-cell-${i}`}
                    onClick={() => handleDateSelection(day)}
                    role="gridcell"
                    aria-selected={isEqual(state, day)}
                  >
                    <span role="alert">{getDate(day)}</span>
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
