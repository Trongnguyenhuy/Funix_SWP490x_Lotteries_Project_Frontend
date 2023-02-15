/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { AiFillEye } from "react-icons/ai";
import LotteryCard from "../../Components/Card/LotteryCard";
import VerticalSlideCard from "../../Components/Slide/VerticalSlide/VerticalSlideCard";
import {
  getLotteriesAction,
  getLotteriesByStationAndDateAction,
} from "../../Redux/Actions/ManageLotteriesAction";
import BreadcrumbComponent from "../../Components/Breadcrumb/Breadcrumb";
import { coverDateToDayVn } from "../../Utils/helper/helperFunction";
import PaginationComponent from "../../Components/Pagination/Pagination";
import CalendarComponent from "../../Components/Calendar/Calendar";
import moment from "moment";
import { coverVnDateString, sortDate } from "../../Utils/helper/helperFunction";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import ModalCalendar from "../../Components/Calendar/ModalCalendar/ModalCalendar";
import { DOMAIN } from "../../Utils/settings/Configs";
import StationDisplayCard from "./StationDisplayCard/StationDisplayCard";
import { BiSortAZ } from "react-icons/bi";
import SortOptionsModal from "../../Components/SortOptionsModal/SortOptionsModal";

const yesterday = new Date(Date.now() - 86400000);

export default function StationLotteries(props) {
  const { station, zone } = useParams();
  const { url } = props.match;
  let perPage = 6;
  let [page, setPage] = useState(1);
  let [showAll, setShowAll] = useState(false);
  let [datePick, setDatePick] = useState(moment(yesterday)._d);
  const [openCalendarModal, setIopenCalendarModal] = useState(false);
  const [openSortOptions, setOpenSortOptions] = useState(false);
  const dispatch = useDispatch();
  let lotteriesArr;

  const arrTitle = url.split("/");
  const lengthArrTitle = arrTitle.length;
  document.title = `VÉ DÒ ${arrTitle[lengthArrTitle - 1].toUpperCase()}`;

  const onHandlePage = (page) => {
    setPage(page);
  };

  const onSort = (option) => {
    setSortBy(option);
  };

  const [sortBy, setSortBy] = useState("");

  const onHandleDatePick = (date) => {
    setShowAll(false);
    setDatePick(date);
  };

  let { arrLotteries, lotteriesByStation } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  if (zone === "Miền Bắc") {
    lotteriesArr = arrLotteries.filter(
      (item) => item.stationId.zoneCode === "MB01"
    );

    if (station) {
      lotteriesArr = lotteriesArr.filter(
        (item) => coverDateToDayVn(item.date) === station
      );
    }
  } else {
    lotteriesArr = [...lotteriesByStation];
  }

  if (!showAll) {
    lotteriesArr = lotteriesArr.filter(
      (item) => item.date === coverVnDateString(datePick)
    );
  }

  if (sortBy === "N" || sortBy === "D") {
    lotteriesArr = lotteriesArr.sort((a, b) => {
      return sortDate(a.date, b.date, sortBy);
    });
  }

  let sliceLotteriesByState = lotteriesArr.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    setShowAll(false);

    const action = getLotteriesAction();
    dispatch(action);

    const actionLotteries = getLotteriesByStationAndDateAction(station, zone);
    dispatch(actionLotteries);
  }, [station, zone]);

  const renderCard = (stations) => {
    return stations.map((item, index) => {
      return (
        <div
          key={item.stationId.name + "" + index}
          className="grid grid-cols-1 gap-4 px-4 my-2"
        >
          <NavLink to={`/lottery/${zone}/${station}/${item._id}`}>
            <LotteryCard lottery={item} compareLotteries={arrLotteries} />
          </NavLink>
        </div>
      );
    });
  };

  return (
    <CustomCard
      style={{ paddingTop: 150, minHeight: "100vh" }}
      effectColor="#fff" // required
      color="#fff" // default color is white
      blur={20} // default blur value is 10px
      borderRadius={0} // default border radius value is 10px
    >
      <BreadcrumbComponent url={url} />
      <div className="flex flex-col gap-4 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 justify-items-center">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-md w-full p-2">
              <div className="p-2 flex justify-between border-b-2 border-gray-200 mb-4">
                <div className="flex items-center">
                  <h2 className="md:text-xl text-4xl font-bold">
                    DANH SÁCH VÉ DÒ {station.toUpperCase()}
                  </h2>
                </div>
                <div className="text-black grid grid-rows-2 gap-4 justify-items-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full flex items-center border-2 border-gray-200 p-1 rounded-md"
                  >
                    <AiFillEye className="text-2xl font-bold mr-2" />
                    <span className="hidden md:flex">Xem hết </span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenSortOptions(true);
                    }}
                    className="w-full flex items-center border-2 border-gray-200 p-1 rounded-md"
                  >
                    <BiSortAZ className="text-2xl font-bold mr-2" />{" "}
                    <span className="hidden md:flex">Sắp Xếp </span>
                  </button>
                  <button
                    onClick={() => {
                      setIopenCalendarModal(true);
                    }}
                    className="w-full flex lg:hidden items-center border-2 border-gray-200 p-1 rounded-md"
                  >
                    <BsFillCalendarCheckFill className="text-2xl font-bold mr-2" />
                    <span className="hidden md:flex">Chọn Ngày</span>
                  </button>
                  <SortOptionsModal
                    openSortOptions={openSortOptions}
                    setOpenSortOptions={setOpenSortOptions}
                    onSort={onSort}
                    station={true}
                  />
                  <ModalCalendar
                    openCalendarModal={openCalendarModal}
                    setIopenCalendarModal={setIopenCalendarModal}
                    onHandleDatePick={onHandleDatePick}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center">
                {renderCard(sliceLotteriesByState)}
              </div>
              <div className="flex justify-center my-6">
                <PaginationComponent
                  total={lotteriesArr.length}
                  perPage={perPage}
                  onHandlePage={onHandlePage}
                />
              </div>
            </div>
            <StationDisplayCard domain={DOMAIN} state={station} />
          </div>
          <div
            className="lg:col-span-4 flex flex-col items-center"
            style={{ width: "100%" }}
          >
            <div className="w-fit hidden lg:flex">
              <CalendarComponent onHandleDatePick={onHandleDatePick} />
            </div>
            <div className="w-fit hidden lg:flex mt-2">
              <VerticalSlideCard
                arrLotteries={arrLotteries.slice(0, 12)}
                vertical={true}
                numberCardShow={3}
                header={true}
                compareLotteries={arrLotteries}
              />
            </div>
            <div
              className="flex flex-col items-center lg:hidden "
              style={{ width: "100%" }}
            >
              <VerticalSlideCard
                arrLotteries={arrLotteries.slice(0, 12)}
                vertical={false}
                numberCardShow={4}
                compareLotteries={arrLotteries}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomCard>
  );
}
