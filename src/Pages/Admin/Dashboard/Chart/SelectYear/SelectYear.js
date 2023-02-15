import React from "react";
import { Select } from "antd";

export default function SelectYear(props) {
  const { yearStatic, setYearStatic, currentYear } = props;

  const optionValues = [];

  for (let i = currentYear; i > currentYear - 5; i--) {
    optionValues.push({
      value: i.toString(),
      label: i.toString(),
    });
  }


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setYearStatic(value);
  };
  return (
    <Select
      defaultValue={yearStatic}
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={optionValues}
    />
  );
}
