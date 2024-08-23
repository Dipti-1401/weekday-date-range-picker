import React, { useCallback } from "react";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import "./App.css";
import { resetTime } from "./utils/dateUtils";

interface PredefinedRange {
  label: string;
  range: [Date, Date];
}

function App() {
  const predefinedRanges: PredefinedRange[] = [
    {
      label: "Last 7 Days",
      range: [
        resetTime(new Date(new Date().setDate(new Date().getDate() - 7))),
        resetTime(new Date()),
      ],
    },
    {
      label: "Last 30 Days",
      range: [
        resetTime(new Date(new Date().setDate(new Date().getDate() - 30))),
        resetTime(new Date()),
      ],
    },
    {
      label: "Yesterday",
      range: [
        resetTime(new Date(new Date().setDate(new Date().getDate() - 1))),
        resetTime(new Date(new Date().setDate(new Date().getDate() - 1))),
      ],
    },
    {
      label: "Today",
      range: [resetTime(new Date()), resetTime(new Date())],
    },
  ];

  const handleDateRangeChange = useCallback(
    (selectedRange: [Date, Date], weekendDates: Date[]) => {
      console.log("Selected Range:", selectedRange);
      console.log("Weekend Dates:", weekendDates);
    },
    []
  );

  return (
    <div className="App">
      <DateRangePicker
        predefinedRanges={predefinedRanges}
        onChange={handleDateRangeChange}
      />
    </div>
  );
}

export default App;
