import React from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { RiTimerFill } from "react-icons/ri";
import { MdFiberNew } from "react-icons/md";
import "./FlipCard.css";
import { NavLink } from "react-router-dom";
import { DOMAIN } from "../../Utils/settings/Configs";

export default function FlipCard(props) {
  const { item } = props;
  let imgSrc;
  if (item.imgUrl.includes("https:/")) {
    imgSrc = item.imgUrl;
  } else {
    imgSrc = DOMAIN + "/" + item.imgUrl;
  }
  const optionStyle = {
    backgroundImage: `url('${imgSrc}')`,
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flip-card w-72 h-80">
      <div className="flip-card-inner h-fit relative">
        <div
          className="flip-card-front h-fit rounded-md shadow-md text-gray-100"
          style={optionStyle}
        >
          <img
            src="https://picsum.photos/200/300"
            alt="unsplash.com"
            className="object-cover object-center w-full rounded-t-md h-72 opacity-0"
          />
          <div className="flex flex-col justify-between p-2 space-y-8 absolute bottom-4 w-full">
            <div className="space-y-2 bg-black bg-opacity-60 px-2 py-2 h-40">
              <h2 className="text-3xl font-semibold tracking-wide flex text-white mb-2">
                Vé Số {item.stationId.name}
              </h2>
              <p className="text-white flex">
                <BsCalendarWeekFill className="text-xl mr-2" />
                Ngày Mở Thưởng: {item.date}.
              </p>
              <p className="text-white flex">
                <RiTimerFill className="text-2xl mr-2" />
                Giờ Mở Thưởng: {item.stationId.open.time}
              </p>
            </div>
          </div>
          <div className="text-4xl text-red-900 font-bold absolute top-0">
            <MdFiberNew />
          </div>
        </div>
        <div
          className="flip-card-back rounded-md shadow-md"
          style={optionStyle}
        >
          <NavLink
            to={`/lottery/${
              item.stationId.zoneCode === "MB01"
                ? "Miền Bắc"
                : item.stationId.zoneCode === "MT01"
                ? "Miền Trung"
                : "Miền Nam"
            }/${item.stationId.name}/${item._id}`}
            className="w-full h-full bg-black  bg-opacity-60 flex justify-center items-center rounded-md hover:cursor-pointer"
          >
            <button className="bg-violet-400 w-1/2 text-black hover:bg-gray-900 hover:text-violet-400 font-bold py-2 px-4 border border-blue-700 rounded">
              Xem Vé Dò
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
