import React, { useEffect, useRef, useReducer } from "react";
import { format, getDate, isEqual } from "date-fns";
import { useGenerateDays, useGenerateDates } from "./hooks";
import calendarKeyPress from "./calendarKeyPress";
import dateReducer from "./dateReducer";
import Header from "./Header";
import "./Calendar.css";

const initialDate = new Date();
const initialState = { selectedDate: initialDate, focusedDate: initialDate };

const Calendar = () => {
  const [state, dispatch] = useReducer(dateReducer, initialState);
  const focusedDateRef = useRef(null);
  const dates = useGenerateDates(state.focusedDate);
  const days = useGenerateDays({ length: 2 });
  
  useEffect(() => focusedDateRef.current.focus());

  return (
    <div>
      <div className="calendar">
        <Header state={state} dispatch={dispatch} />
        <table tabIndex="0" role="grid" aria-label="Month"
          onKeyDown={(e => calendarKeyPress(e, state, dispatch))}>
          <thead>{days}</thead>
          <tbody>{dates.map((week, i) => (
            <tr className="week" key={`week-${i}`} role="row">
              {week.map((day, j) => {
                const date = getDate(day);
                return (day && (<td
                  key={`day-cell-${j}`}
                  tabIndex={0} role="gridcell"
                  aria-selected={isEqual(state.focusedDate, day)}
                  style={(i === 0 && date > 22) || (i > 3 && date < 8) ?
                    { color: `hsla(129, 0%, 60%, 1.0)`, fontWeight: "normal" } : null}
                  className={`cell ${isEqual(state.focusedDate, day) ? "active" : ""}`}
                  ref={isEqual(state.focusedDate, day) ? focusedDateRef : null}
                  onClick={() => dispatch({ type: "SET_DATE", payload: day })}
                >{date}</td>));
              })}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <span className="date-display">
        Selected Date: {format(state.selectedDate, "MM/dd/yyyy")}
      </span>
    </div>
  );
};
export default Calendar;
