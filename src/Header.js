import React from "react";
import { format } from "date-fns";

const Header = ({ state, dispatch }) => {
  const handleKeyPress = (e, cb) => (e.key === 13 || e.key === 32) && cb();

  return (
    <div className="title">
      <div className="icons">
        {/* previous year */}
        <div
          tabIndex="0"
          role="button"
          aria-label="Previous year"
          className="iconContainer"
          onClick={() => dispatch({ type: "SET_PREVIOUS_YEAR" })}
          onKeyPress={(e) =>
            handleKeyPress(e, dispatch({ type: "SET_PREVIOUS_YEAR" }))
          }
        >
          &#10094;&#10094;
        </div>
        {/* previous month */}
        <div
          tabIndex="0"
          role="button"
          aria-label="Previous month"
          className="iconContainer"
          onClick={() => dispatch({ type: "SET_PREVIOUS_MONTH" })}
          onKeyPress={(e) =>
            handleKeyPress(e, dispatch({ type: "SET_PREVIOUS_MONTH" }))
          }
        >
          &#10094;
        </div>
      </div>

      {/* current month */}
      <div className="month" role="heading" aria-level="2">
        <b>{format(state.focusedDate, "MMMM yyyy")}</b>
      </div>

      {/* next year */}
      <div className="icons">
        <div
          tabIndex="0"
          role="button"
          aria-label="Next month"
          className="iconContainer"
          onClick={() => dispatch({ type: "SET_NEXT_MONTH" })}
          onKeyPress={(e) =>
            handleKeyPress(e, dispatch({ type: "SET_NEXT_MONTH" }))
          }
        >
          &#10095;
        </div>
        {/* next month */}
        <div
          tabIndex="0"
          role="button"
          aria-label="Next year"
          className="iconContainer"
          onClick={() => dispatch({ type: "SET_NEXT_YEAR" })}
          onKeyPress={(e) =>
            handleKeyPress(e, dispatch({ type: "SET_NEXT_YEAR" }))
          }
        >
          &#10095;&#10095;
        </div>
      </div>
    </div>
  );
};

export default Header;
