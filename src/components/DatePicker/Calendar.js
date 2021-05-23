import React, { useReducer, useEffect, useRef } from "react";
import selectedDateReducer from './selectedDateReducer';

import {
  format,
  formatISO,
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
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
  const [state, dispatch] = useReducer(selectedDateReducer, new Date(date));
  const selectedDayRef = useRef(null);

  useEffect(() => {
    selectedDayRef.current.focus();
  }, [state]);

  const handleKeyPress = (e, cb) => {
    const charCode = e.keyCode;
    if (charCode === 13 || charCode === 32) {
      cb();
    }
  };

  const generateMonth = () => {
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
    console.log(firstDayNextMonth);
    for (let i = 0; i < startWeekday; i++) {
      previous.push(getDate(addDays(firstDayLastMonth, i)));
    }

    for (let i = 0; i < daysLeft; i++) {
      console.log(endWeekday)
      next.push(getDate(addDays(firstDayNextMonth, i)));
    }
    // concatenate previous, current, and next month dates 
    // dividing by 7, split into week arrays w/lodash's chunk
    const gridDays = chunk(
      [...previous.map(day => setDate(firstDayLastMonth, day)),
      ...Array.from({ length: daysInMonth },
        (_, i) => setDate(state, i + 1)),
      ...next.map(day => setDate(firstDayNextMonth, day ))], 7);

    return gridDays;
  };

  const handleTableKeyPress = (e) => {
    const keyCode = e.keyCode;
    selectedDayRef.current.focus();
    // Check if shift key was pressed
    const shift = e.shiftKey;
    switch (keyCode) {
      case 13: //Enter
      case 32: //Space
        handleSelectDate(formatISO(state, "yyyy-MM-dd"));
        return;
      case 27: //Esc
        // closeCalendar();
        return;
      case 33: //Page Up
        shift ?
          dispatch({ type: "SET_DATE_NEXT_YEAR" }) :
          dispatch({ type: "SET_DATE_NEXT_MONTH" });
        return;
      case 34: //Page Down
        shift ?
          dispatch({ type: "SET_DATE_PREVIOUS_YEAR" }) :
          dispatch({ type: "SET_DATE_PREVIOUS_MONTH" });
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
    const dateISO = formatISO(date);
    handleSelectDate(dateISO);
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
              {week.map((day, j) => {
                const date = getDate(day);
                return (
                  day && (
                    <td
                      tabIndex={0}
                      style={(i === 0 && date > 22) || (i > 3 && date < 8) ? { color: "red" } : null}
                      className={`cell ${isEqual(state, day) ? "active" : ""
                        }`}
                      key={`day-cell-${j}`}
                      onClick={() => handleDateSelection(day)}
                      role="gridcell"
                      aria-selected={isEqual(state, day)}
                      ref={isEqual(state, day) ? selectedDayRef : null}
                    >
                      {date}
                    </td>
                  )
                );
              }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
