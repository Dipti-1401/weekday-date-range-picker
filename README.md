```markdown
# Weekday Date Range Picker

A React and TypeScript component for selecting a range of weekdays, with options to exclude weekends and predefined ranges like "Yesterday," "Today," "Last 7 Days," and "Last 30 Days."

## Features

- **Weekday-only Selection**: Excludes weekends from the date range selection.
- **Predefined Ranges**: Includes "Yesterday," "Today," "Last 7 Days," and "Last 30 Days."
- **Responsive Design**: Fully responsive and styled with a modern UI.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dipti-1401/weekday-date-range-picker.git
   cd weekday-date-range-picker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Usage

Import and integrate the `DateRangePicker` component into your project:

```tsx
import DateRangePicker from './components/DateRangePicker';

function App() {
  const handleDateRangeChange = (selectedRange, weekendDates) => {
    console.log('Selected Range:', selectedRange);
    console.log('Weekend Dates:', weekendDates);
  };

  return <DateRangePicker onChange={handleDateRangeChange} />;
}

export default App;
```


---

Developed by [Dipti Gupta](https://github.com/Dipti-1401)
```

