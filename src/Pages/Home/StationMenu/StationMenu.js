import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch } from "react-redux";
import {
  SET_STATIONS_CENTERZONE,
  SET_STATIONS_NORTHZONE,
  SET_STATIONS_SOUTHZONE,
} from "../../../Redux/Actions/Types/ManageStationsType";
import { SET_LOTTERIES_BY_STATION } from "../../../Redux/Actions/Types/ManageLotteriesTypes";
import "./StationMenu.css";
import { NavLink } from "react-router-dom";
import LotteryCard from "../../../Components/Card/LotteryCard";

export default function StationMenu(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveZoneKey("1");
    setStationActiveKey("1");
  }, []);

  const { arrStations, filterLotteriesByStation } = props;

  const arrTabMenu = [
    {
      name: "MIỀN BẮC",
      actionType: SET_STATIONS_NORTHZONE,
      key: "1",
      zoneCode: "MB01",
    },
    {
      name: "MIỀN TRUNG",
      actionType: SET_STATIONS_CENTERZONE,
      key: "2",
      zoneCode: "MT01",
    },
    {
      name: "MIỀN NAM",
      actionType: SET_STATIONS_SOUTHZONE,
      key: "3",
      zoneCode: "MN01",
    },
  ];

  let [activeZoneKey, setActiveZoneKey] = useState("1");
  let [activeStationKey, setStationActiveKey] = useState("1");

  let tabZoneMenu = (item) => {
    return (
      <div
        className="grid grid-rows-3 gap-4"
        onClick={() => {
          const actionStation = {
            type: item.actionType,
          };
          const actionLotteries = {
            type: SET_LOTTERIES_BY_STATION,
            station:
              item.zoneCode === "MB01"
                ? "Miền Bắc"
                : item.zoneCode === "MT01"
                ? "Bình Định"
                : "An Giang",
          };
          dispatch(actionStation);
          dispatch(actionLotteries);
          setActiveZoneKey(item.key);
          setStationActiveKey("1");
        }}
      >
        <div className="row-span-2 w-20 rounded-full">
          <img
            src="https://picsum.photos/200"
            alt="zoneImage"
            className="rounded-full"
          />
        </div>
        <p> VÉ DÒ {item.name.toUpperCase()} </p>
      </div>
    );
  };

  let tabStationMenu = (station, id) => {
    return (
      <div
        className="grid grid-rows-3 gap-4"
        onClick={() => {
          const actionLotteries = {
            type: SET_LOTTERIES_BY_STATION,
            station: station.name,
          };
          dispatch(actionLotteries);
          setStationActiveKey(id);
        }}
      >
        <div className="row-span-2 w-20 rounded-full">
          <img
            src="https://picsum.photos/200"
            alt={`vé Số ${station.name}`}
            className="rounded-md"
          />
        </div>
        <p> VÉ SỐ {station.name.toUpperCase()} </p>
      </div>
    );
  };

  let tabZoneItem = (stations) => {
    return (
      <Tabs
        defaultActiveKey="1"
        activeKey={activeStationKey}
        tabPosition={"left"}
        style={{
          height: 500,
        }}
        items={stations.map((station, i) => {
          const id = String(i + 1);
          return {
            label: tabStationMenu(station, id),
            key: id,
            children: tabStationItem(filterLotteriesByStation),
          };
        })}
      />
    );
  };

  let tabStationItem = (loteries) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {loteries.slice(0, 4).map((lottery) => {
          return (
            <NavLink
              to={`/lottery/${
                lottery.stationId.zoneCode === "MB01"
                  ? "Miền Bắc"
                  : lottery.stationId.zoneCode === "MT01"
                  ? "Miền Trung"
                  : "Miền Nam"
              }/${lottery.stationId.name}/${lottery._id}`}
            >
              <LotteryCard lottery={lottery} hover={true} w={72} />
            </NavLink>
          );
        })}
      </div>
    );
  };

  return (
    <div className="Station-Menu grid grid-row-8 gap-4 divide-gray-700 border border-gray-500 rounded-md py-2">
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-bold border-b-2 border-gray-200 py-4">
          KẾT QUẢ MỚI NHẤT THEO ĐÀI:
        </h2>
      </div>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeZoneKey}
        tabPosition={"left"}
        items={arrTabMenu.map((item, i) => {
          const id = String(i + 1);
          return {
            label: tabZoneMenu(item),
            key: id,
            children: tabZoneItem(arrStations),
          };
        })}
      />
    </div>
  );
}
