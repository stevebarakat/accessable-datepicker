import { useRef } from 'react';
import { formatISO } from 'date-fns';

export const useSelectDate = (e, state, dispatch) => {
  const selectedDayRef = useRef(null);
  const keyCode = e.keyCode;
  selectedDayRef.current.focus();
  // Check if shift key was pressed
  const shift = e.shiftKey;
  switch (keyCode) {
    case 13: //Enter
    case 32: //Space
      // handleSelectDate(formatISO(state, "yyyy-MM-dd"));
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
