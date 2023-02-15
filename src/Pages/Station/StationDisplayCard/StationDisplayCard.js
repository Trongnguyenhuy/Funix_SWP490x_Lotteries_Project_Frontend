/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BiMap } from "react-icons/bi";
import { BsCalendarWeek, BsTelephoneFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { MdWeb } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLotteriesByStationAndDateAction } from "../../../Redux/Actions/ManageLotteriesAction";
import { translateDay } from "../../../Utils/helper/helperFunction";

export default function StationDisplayCard(props) {
  const { station, zone } = useParams();
  const { lotteriesByStation } = useSelector(
    (state) => state.ManageLotteriesReducer
  );
  const { domain } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const actionLotteriesBystation = getLotteriesByStationAndDateAction(
      station,
      zone
    );
    dispatch(actionLotteriesBystation);
  }, [station, zone]);

  let stationInfo = lotteriesByStation[0].stationId;
  let renderDay = stationInfo.open.weekDay.map((day) => {
    return translateDay(day, "vn").toUpperCase();
  });
  renderDay = renderDay.join("-");
  let time = stationInfo.open.time;
  return (
    <div className="divide-x-2 divide-gray-200 w-full bg-white rounded-md grid grid-cols-1 lg:grid-cols-3 justify-items-center mt-2">
      <div className="flex flex-col gap-4 items-center p-2">
        <img
          src={
            stationInfo.imgUrl !== undefined
              ? domain + "/" + stationInfo.imgUrl
              : "https://picsum.photos/200"
          }
          alt="Logo"
          className="flex-2 rounded-md w-2/3 self-center"
        />
        <div 
          className="
            text-black text-xs
            mt-2 w-full px-4 py-2
            border-t-2 border-gray-200
          "
        >
          <p className="flex gap-4 justify-start">
            <BsCalendarWeek className="text-base" /> NGÀY MỞ THƯỞNG: {renderDay}
          </p>
          <p className="flex gap-4 justify-start">
            <IoMdTime className="text-base" /> GIỜ MỞ THƯỞNG: {time}
          </p>
        </div>
      </div>
      <div className="col-span-2 p-2 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center">
          {stationInfo.fullName}
        </h2>
        <div className="text-black mt-8 border-2 border-gray-200 rounded-md p-2">
          <p className="flex gap-4 justify-start">
            <BiMap className="text-2xl" />
            {stationInfo.descriptions.address}
          </p>
          <p className="flex gap-4 justify-start">
            <BsTelephoneFill className="text-2xl" />
            {stationInfo.descriptions.phoneNum}
          </p>
          <p className="flex gap-4 justify-start">
            <MdWeb className="text-2xl" />
            <a href={stationInfo.descriptions.webSite} target="_blank" rel="noreferrer">
              {stationInfo.descriptions.webSite.toUpperCase()}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
