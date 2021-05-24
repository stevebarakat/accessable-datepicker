import React, { useEffect, useRef, useReducer } from 'react';
import { format, getDate, isEqual } from "date-fns";
import { useGenerateMonth, useGenerateWeekdays } from './hooks';
import selectedDateReducer from './selectedDateReducer';
import Header from './Header';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(selectedDateReducer, new Date(format(new Date(), "yyyy-MM-dd")));
  const selectedDayRef = useRef(null);
  const month = useGenerateMonth(state);
  useEffect(() => {
    selectedDayRef.current.focus();
  }, [state]);

  function handleTableKeyPress(e) {
    selectedDayRef.current.focus();
    // Check if shift key was pressed
    const shift = e.shiftKey;
    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        dispatch({ type: "SET_DATE", payload: state });
        return;
      case 27: //Esc
        // close calendar
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

  return (
    <div>
      <div className="calendar">
        <Header state={state} dispatch={dispatch} />
        <table id="grid" role="grid" tabIndex="0" aria-label="Month"
          onKeyDown={handleTableKeyPress}
        >
          <thead>
            {useGenerateWeekdays()}
          </thead>
          <tbody>
            {month.map((week, i) => (
              <tr className="week" key={`week-${i}`} role="row">
                {week.map((day, j) => {
                  const date = getDate(day);
                  return (
                    day && (
                      <td
                        tabIndex={0}
                        style={(i === 0 && date > 22) || (i > 3 && date < 8) ? { color: "red" } : null}
                        className={`cell ${isEqual(state, day) ? "active" : ""}`}
                        key={`day-cell-${j}`}
                        onClick={() => dispatch({ type: "SET_DATE", payload: day })}
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
      <span style={{height: "30px", }}>selected date: {format(state, "MM/dd/yyyy")}</span>
    </div>
  );
};
export default App;