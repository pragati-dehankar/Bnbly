import React from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function CalenderInput({ value, onChange,disabledDates, ...props }) {
  function handleLog(ranges) {
    // Pass the updated selection back to parent
    onChange(ranges);
  }

  return (
    <DateRange
      minDate={new Date()}
      ranges={[value]}
      onChange={handleLog}
      disabledDates={disabledDates}
      {...props}
    />
  );
}
