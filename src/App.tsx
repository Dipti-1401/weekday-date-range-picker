// src/App.tsx
import React from 'react';
import './App.css';
import { DateRangePicker } from './components/DateRangePicker';

function App() {
  function handleDateRangeChange(selectedRange: [Date, Date], weekendDates: Date[]) {
    console.log('Selected Range:', selectedRange);
    console.log('Weekend Dates:', weekendDates);
  }

  const predefinedRanges = [
    {
      label: 'Last 7 Days',
      range: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()] as [Date, Date],
    },
    {
      label: 'Last 30 Days',
      range: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()] as [Date, Date],
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weekday Date Range Picker</h1>
        <DateRangePicker predefinedRanges={predefinedRanges} onChange={handleDateRangeChange} />
      </header>
    </div>
  );
}

export default App;
