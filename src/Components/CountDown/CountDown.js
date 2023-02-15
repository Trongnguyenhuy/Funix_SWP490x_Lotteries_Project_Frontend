import Countdown from "react-countdown";
import React from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { RiTimerFill } from "react-icons/ri";
// import HashLoader from "react-spinners/HashLoader";

const Completionist = () => {
  return (
    <div className="flex justify-center text-6xl font-bold font-digital text-blue-500 text-center py-2 px-2">
      <span>00:00:00</span>
    </div>
  );
};

const renderer = (props) => {
  let { hours, minutes, seconds, completed } = props;

  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <p className="text-4xl  md:text-6xl font-bold font-digital text-blue-500 text-center h-1">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    );
  }
};

export default function CountDownTimer(props) {
  let { item } = props;
  let { isToday, hoursdiff } = item;
  let date = new Date();

  if (!isToday) {
    date.setDate(date.getDate() + 1);
  }

  if (hoursdiff <= 0) {
    hoursdiff = 0;
  }

  return (
    <div className="flex flex-col divide-y w-72 h-20 md:h-52 lg:h-60  bg-black bg-opacity-60 rounded-md">
      <Countdown
        date={Date.now() + hoursdiff}
        renderer={(props) => renderer({ ...props, isToday, hoursdiff })}
      />
      <div className="text-white font-bold px-2 py-2 row-span-3">
        <h3 className="text-white text-lg md:text-xl">
          XỔ SỐ {item.name.toUpperCase()}
        </h3>
        <p className="hidden md:flex">
          <BsCalendarWeekFill className="text-2xl mr-2" />
          NGÀY MỞ THƯỞNG:{" "}
          <span className="text-blue-500 ml-1 py-1 px-2 border border-blue-500 bg-transparent rounded">
            {date.toLocaleDateString()}
          </span>
        </p>
        <p className="hidden md:flex">
          <RiTimerFill className="text-2xl mr-2" />
          GIỜ MỞ THƯỞNG:{" "}
          <span className="text-blue-500 ml-1 py-1 px-2 border border-blue-500 bg-transparent rounded">
            {item.open.time}
          </span>
        </p>
      </div>
    </div>
  );
}
