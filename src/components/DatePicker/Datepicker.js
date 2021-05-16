import React from 'react';
import { format } from 'date-fns';

const Datepicker = ({ date, handleSelect }) => {
  const handleKeyPress = (e) => {
    const charCode = e.charCode
    if(charCode === 13 || charCode === 32) {
      handleSelect();
    }
  }
  return (
    <div
      className="datepicker"
      tabIndex="0"
      onClick={handleSelect}
      onKeyPress={handleKeyPress}
      role="button"
      aria-label="Datepicker"
    >
      <div>
        Select a date
      </div>
      <div aria-label="Selected date">
        {format(new Date(date), "yyyy-MM-dd")}
      </div>
    </div>
  );
}
export default Datepicker;