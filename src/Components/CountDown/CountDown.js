import Countdown from "react-countdown";
import React from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { RiTimerFill } from "react-icons/ri";
import moment from "moment";
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
      <p
        className="
          text-4xl  lg:text-6xl 
          font-bold font-digital 
          text-white
          text-center 
          h-fit w-full
          p-2
          border-b-2 border-white
        "
      >
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
    <>
      <div
        className="
          flex flex-row justify-center
          h-1/2 lg:h-1/3 w-full
        "
      >
        <Countdown
          date={Date.now() + hoursdiff}
          renderer={(props) => renderer({ ...props, isToday, hoursdiff })}
        />
      </div>
      <div
        className="
          flex flex-col items-start
          p-2
          h-1/2 lg:h-2/3 w-full
          font-bold
        "
      >
        <h3
          className="
              text-white 
              text-center
              text-base lg:text-2xl
              w-full
          "
        >
          XỔ SỐ {item.name.toUpperCase()}
        </h3>
        <p
          className="
            text-white
            w-full
            hidden lg:flex flex-row justify-start items-center gap-2
          "
        >
          <span
            className="
              py-1 px-2 
              flex flex-row justify-start gap-2
            "
          >
            <BsCalendarWeekFill className="text-2xl" />
            NGÀY MỞ THƯỞNG:
          </span>
          <span
            className="
              text-normal
              py-1 px-2 
              border-2 border-blue-500 
              bg-transparent 
              rounded-sm
            "
          >
            {moment(date).format("DD/MM/YYYY")}
          </span>
        </p>
        <p
          className="
          text-white
            w-full
            hidden lg:flex flex-row justify-start gap-2
          "
        >
          <span
            className="
              py-1 px-2 
              flex flex-row justify-start gap-2
            "
          >
            <RiTimerFill className="text-2xl" />
            GIỜ MỞ THƯỞNG:{" "}
          </span>
          <span
            className="
              text-normal
              py-1 px-2 
              border-2 border-blue-500 
              bg-transparent 
              rounded-sm
            "
          >
            {item.open.time}
          </span>
        </p>
      </div>
    </>
  );
}
