import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Loading(props) {
  const { isLoading } = useSelector(state => state.LoadingReducer);

  return (
    <div
      className={`${isLoading ? '': 'invisible'}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
      }}
    >
      <SyncOutlined spin className="text-8xl" style={{ color: 'white', }} />
    </div>
  );
}
