// src/App.tsx
import React, { useState } from 'react';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';

const predefinedRanges = [
  {
    label: 'Last 7 Days',
    range: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()] as [Date, Date],
  },
  {
    label: 'Last 30 Days',
    range: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()] as [Date, Date],
  },
  {
    label: 'Yesterday',
    range: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1))] as [Date, Date],
  },
  {
    label: 'Today',
    range: [new Date(), new Date()] as [Date, Date],
  },
];

function App() {
  const [forceUpdate, setForceUpdate] = useState(false); // Force update state

  const handleDateRangeChange = (selectedRange: [Date, Date], weekendDates: Date[]) => {
    console.log('Selected Range:', selectedRange);
    console.log('Weekend Dates:', weekendDates);
    setForceUpdate(!forceUpdate); // Trigger a re-render
  };

  return (
    <div className="App">
      <DateRangePicker predefinedRanges={predefinedRanges} onChange={handleDateRangeChange} />
    </div>
  );
}

export default App;
