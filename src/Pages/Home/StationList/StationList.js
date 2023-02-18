/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getStationsAction } from "../../../Redux/Actions/ManageStationsAction";
import { checkZoneCode } from "../../../Utils/helper/helperFunction";
import { DOMAIN } from "../../../Utils/settings/Configs";

export default function StationList() {
  const [zone, setZone] = useState("MB01");
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
          className="
            p-4 mt-6
            bg-blue-card 
            rounded-md 
            border-2 border-gray-300 
            flex flex-col items-center 
            hover:cursor-pointer hover:scale-110
          "
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
    <div style={{ backgroundColor: "#F0F2F5" }} className="rounded-md mb-6">
      <div
        className="
          grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-items-center gap-4
          border-b-2 border-gray-300
        "
      >
        <h2
          className="
            lg:col-span-2
            text-2xl font-bold 
            py-4
          "
        >
          KẾT QUẢ THEO ĐÀI
        </h2>
        <div
          className="
            grid grid-cols-3
            w-full
          "
        >
          <button
            className={`
              ${zone === "MB01" ? "bg-red-500 text-white" : "bg-transparent"}
              font-semibold
              hover:bg-red-500 hover:text-white 
              border-l-2 border-gray-300 
              hover:border-transparent 
            `}
            onClick={() => {
              setZone("MB01");
            }}
          >
            MIỀN BẮC
          </button>
          <button
            className={`
              ${zone === "MT01" ? "bg-red-500 text-white" : "bg-transparent"}
              font-semibold
              hover:bg-red-500 hover:text-white 
              border-l-2 border-gray-300 
              hover:border-transparent 
            `}
            onClick={() => {
              setZone("MT01");
            }}
          >
            MIỀN TRUNG
          </button>
          <button
            className={`
              ${zone === "MN01" ? "bg-red-500 text-white" : "bg-transparent"}
              font-semibold
              hover:bg-red-500 hover:text-white 
              border-l-2 border-gray-300 
              hover:border-transparent 
              lg:rounded-tr-md
            `}
            onClick={() => {
              setZone("MN01");
            }}
          >
            MIỀN NAM
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center p-4">
        {zone === "MB01" && (
          <div
            className="
              p-6 mt-4
              bg-white rounded-md 
              grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6
            "
          >
            {renderStation("MB01")}
          </div>
        )}

        {zone === "MT01" && (
          <div
            className="
              p-6 mt-4
              bg-white rounded-md
              grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6
            "
          >
            {renderStation("MT01")}
          </div>
        )}

        {zone === "MN01" && (
          <div
            className="
              p-6 mt-4
              bg-white rounded-md
              grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6
            "
          >
            {renderStation("MN01")}
          </div>
        )}
      </div>
    </div>
  );
}
