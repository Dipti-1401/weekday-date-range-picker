import React, { useCallback } from 'react';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import './App.css';

function App() {
  const predefinedRanges = useCallback(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return [
      {
        label: 'Last 7 Days',
        range: [new Date(today.setDate(today.getDate() - 7)), new Date()] as [Date, Date],
      },
      {
        label: 'Last 30 Days',
        range: [new Date(today.setDate(today.getDate() - 30)), new Date()] as [Date, Date],
      },
      {
        label: 'Yesterday',
        range: [yesterday, yesterday] as [Date, Date],
      },
      {
        label: 'Today',
        range: [new Date(), new Date()] as [Date, Date],
      },
    ];
  }, []);

  const handleDateRangeChange = useCallback((selectedRange: [Date, Date], weekendDates: Date[]) => {
    console.log('Selected Range:', selectedRange);
    console.log('Weekend Dates:', weekendDates);
  }, []);

  return (
    <div className="App">
      <DateRangePicker predefinedRanges={predefinedRanges()} onChange={handleDateRangeChange} />
    </div>
  );
}

export default App;
