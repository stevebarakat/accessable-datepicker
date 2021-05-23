import React, { useState } from 'react';
import { format } from 'date-fns';
import Datepicker from "./components/DatePicker/Datepicker";
import Calendar from "./components/DatePicker/Calendar";
import './App.css';

const App = () => {
  const [showDatepicker, setShowDatePicker] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const toggleCalendar = (e) => {
    setShowDatePicker(false);
    setShowCalendar(true);
  };
  const handleSelectDate = (date) => {
    setDate(date);
    setShowDatePicker(true);
    setShowCalendar(false);
  };
  const closeCalendar = () => {
    setShowDatePicker(true);
    setShowCalendar(false);
  };

  return (
    <div className="App" role="application">
      {showDatepicker && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ><Datepicker date={date} handleSelect={toggleCalendar} /></div>
      )}
      {showCalendar && (
          <div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
          ><Calendar date={date} handleSelectDate={handleSelectDate} closeCalendar={closeCalendar} /></div>
      )}
    </div>
  );
};
export default App;