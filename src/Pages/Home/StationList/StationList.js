/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getStationsAction } from "../../../Redux/Actions/ManageStationsAction";
import { checkZoneCode } from "../../../Utils/helper/helperFunction";
import { DOMAIN } from "../../../Utils/settings/Configs";

export default function StationList() {
  const { defaultStation } = useSelector(
    (state) => state.ManageStationsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getStationsAction();
    dispatch(action);
  }, []);

  const renderStation = (zone) => {
    const stations = defaultStation.filter((item) => item.zoneCode === zone);
    return stations.map((item, index) => {
      return (
        <div
          key={zone + " " + index}
          className="p-4 bg-white rounded-md border-2 border-gray-200 mt-6 flex flex-col items-center hover:cursor-pointer hover:scale-110"
        >
          <NavLink
            to={`/lottery/${checkZoneCode(item.zoneCode)}${
              item.zoneCode === "MB01" ? "" : "/" + item.name
            }`}
          >
            <img
              src={
                item.imgUrl !== undefined
                  ? DOMAIN + "/" + item.imgUrl
                  : "https://picsum.photos/200"
              }
              alt={item.name}
              className="rounded-xl"
            />
            <p className="text-base font-bold mt-2 text-center">
              {item.name.toUpperCase()}
            </p>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div style={{ backgroundColor: "#F0F2F5" }} className="rounded-md py-2">
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-bold border-b-2 border-gray-200 py-4">
          KẾT QUẢ THEO ĐÀI
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-3/4 p-6 bg-white rounded-md my-2">
          <h3 className="text-xl font-semibold text-center">MIỀN BẮC</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {renderStation("MB01")}
          </div>
        </div>
        <div className="w-3/4 p-6 bg-white rounded-md my-2">
          <h3 className="text-xl font-semibold text-center">MIỀN TRUNG</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {renderStation("MT01")}
          </div>
        </div>
        <div className="w-3/4 p-6 bg-white rounded-md my-2">
          <h3 className="text-xl font-semibold text-center">MIỀN NAM</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {renderStation("MN01")}
          </div>
        </div>
      </div>
    </div>
  );
}
