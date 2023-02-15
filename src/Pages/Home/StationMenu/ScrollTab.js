import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { Radio, Tabs } from "antd";

const Scroll = () => {
  const [mode, setMode] = useState("top");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <div className="w-1/2">
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{
            height: 220,
          }}
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i);
            return {
              label: `Tab-${id}`,
              key: id,
              disabled: i === 28,
              children: `Content of tab ${id}`,
            };
          })}
        />
      </div>
    </div>
  );
};
export default Scroll;
