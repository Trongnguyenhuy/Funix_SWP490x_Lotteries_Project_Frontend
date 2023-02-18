import React from "react";
import { NavLink } from "react-router-dom";

export default function SummaryCard(props) {
  const { arr, text } = props;
  return (
    <div className="border-2 border-gray-200 rounded-xl shadow-2xl relative p-2 mt-4 bg-blue-card">
      <div className="absolute left-5 -top-8 bg-red-200 p-4 w-1/4  h-16 flex flex-col items-center justify-center">
        <h2 className="text-center text-xl font-bold p-2">{text}</h2>
      </div>
      <div className="mt-6 flex flex-col items-end ">
        <p className="border-b-2 border-gray-200">TỔNG SỐ {text}</p>
        <p className="text-6xl font-bold text-gray-500 font-digital">
          {arr.length}.
        </p>
      </div>
      <NavLink
        to={`/administration/manage${
          text === "NGƯỜI DÙNG"
            ? "user"
            : text === "NHÀ ĐÀI"
            ? "station"
            : "lotterie"
        }s`}
      >
        <p className="text-xs text-left">VÀO TRANG QUẢN LÝ {text}</p>
      </NavLink>
    </div>
  );
}
