import React, { useState } from "react";
import { Calendar } from "antd";
import moment from "moment";
const today = moment();

export default function CalendarComponent(props) {
  const { onHandleDatePick } = props;
  const [value, setValue] = useState(today);
  const onSelect = (newValue) => {
    onHandleDatePick(newValue._d);
    setValue(newValue);
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="bg-white rounded-md px-1">
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        value={value}
      />
    </div>
  );
}
