import React from 'react';
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

const Header = ({state, dispatch}) => {

  const handleKeyPress = (e, cb) => {
    const charCode = e.keyCode;
    if (charCode === 13 || charCode === 32) {
      cb();
    }
  };

  return (
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
        <b>{format(state.focusedDate, "MMMM yyyy")}</b>
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
  );
};

export default Header;
