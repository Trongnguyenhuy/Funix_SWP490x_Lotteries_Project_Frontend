/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import LotteryCard from "../../Components/Card/LotteryCard";
import VerticalSlideCard from "../../Components/Slide/VerticalSlide/VerticalSlideCard";
import {
  getLotteriesByZoneAction,
  getLotteriesAction,
} from "../../Redux/Actions/ManageLotteriesAction";
import BreadcrumbComponent from "../../Components/Breadcrumb/Breadcrumb";
import PaginationComponent from "../../Components/Pagination/Pagination";
import { AiFillEye } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import CalendarComponent from "../../Components/Calendar/Calendar";
import moment from "moment";
import {
  coverVnDateString,
  coverDateToDayVn,
  modifyStationName,
  sortName,
  sortDate,
} from "../../Utils/helper/helperFunction";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BiSortAZ } from "react-icons/bi";
import ModalCalendar from "../../Components/Calendar/ModalCalendar/ModalCalendar";
import SortOptionsModal from "../../Components/SortOptionsModal/SortOptionsModal";

const { Search } = Input;
const yesterday = new Date(Date.now() - 86400000);

export default function Lotteries(props) {
  let lotteriesArr;
  const { zone } = useParams();
  const dispatch = useDispatch();
  let perPage = 8;
  let [page, setPage] = useState(1);
  const [dataSearch, setDataSearch] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  let [datePick, setDatePick] = useState(moment(yesterday)._d);
  let [showAll, setShowAll] = useState(false);
  const [openCalendarModal, setIopenCalendarModal] = useState(false);
  const [openSortOptions, setOpenSortOptions] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { url } = props.match;

  const arrTitle = url.split("/");
  const lengthArrTitle = arrTitle.length;

  if (lengthArrTitle >= 3) {
    document.title = `VÉ DÒ ${arrTitle[lengthArrTitle - 1].toUpperCase()}`;
  } else {
    document.title = `VÉ DÒ TOÀN BỘ CÁC ĐÀI`;
  }

  const onHandlePage = (page) => {
    setPage(page);
  };

  const onHandleDatePick = (date) => {
    setShowAll(false);
    setDatePick(date);
  };

  const onSearch = (value) => {
    let search = value;
    search = search.toLowerCase();

    let onSearchData = lotteriesByZone?.filter((item) => {
      let stationName = item.stationId.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search) || item.date.includes(search);
    });

    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const onChangeSearchInput = (e) => {
    let search = e.target.value;
    search = search.toLowerCase();

    let onSearchData = lotteriesByZone?.filter((item) => {
      let stationName = item.stationId.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search) || item.date.includes(search);
    });

    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const onSort = (option) => {
    setSortBy(option);
  };

  useEffect(() => {
    setSearchMode(false);
    setDataSearch([]);
    setShowAll(false);
    const action = getLotteriesAction();
    dispatch(action);
    if (zone) {
      const actionLotteriesByZone = getLotteriesByZoneAction(zone);
      dispatch(actionLotteriesByZone);
    }
  }, [zone]);

  let { arrLotteries, lotteriesByZone } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  if (!zone) {
    lotteriesByZone = [...arrLotteries];
  }

  if (searchMode) {
    lotteriesArr = [...dataSearch];
  } else {
    lotteriesArr = [...lotteriesByZone];
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

  if (sortBy === "asc" || sortBy === "desc") {
    if(arrTitle[lengthArrTitle - 1] === "Miền Bắc") {
      lotteriesArr = lotteriesArr.sort((a, b) => {
        return sortName(
          coverDateToDayVn(a.date),
          coverDateToDayVn(b.date),
          sortBy
        );
      });
    } else {
      lotteriesArr = lotteriesArr.sort((a, b) => {
        return sortName(
          modifyStationName(a.stationId.name),
          modifyStationName(b.stationId.name),
          sortBy
        );
      });
    }
  } 

  let sliceLotteriesByZone = lotteriesArr.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const renderCard = (stations) => {
    return stations.map((item, index) => {
      return (
        <div
          key={item.stationId.name + "" + index}
          className="grid grid-cols-1 gap-4 px-4 my-2"
        >
          <NavLink
            to={`/lottery/${
              item.stationId.zoneCode === "MB01"
                ? "Miền Bắc"
                : item.stationId.zoneCode === "MT01"
                ? "Miền Trung"
                : "Miền Nam"
            }/${item.stationId.name}/${item._id}`}
          >
            <LotteryCard lottery={item} compareLotteries={arrLotteries}/>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <CustomCard
      style={{ paddingTop: 130, minHeight: "100vh" }}
      effectColor="#fff" // required
      color="#fff" // default color is white
      blur={20} // default blur value is 10px
      borderRadius={0} // default border radius value is 10px
    >
      <BreadcrumbComponent url={url} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 justify-items-center">
        <div className="lg:col-span-8 w-full bg-white rounded-lg shadow-md">
          <div className="p-2 mb-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <h2 className="text-3xl py-2 font-bold">
                  {lengthArrTitle < 3
                    ? "DANH SÁCH TOÀN BỘ VÉ DÒ"
                    : `DANH SÁCH VÉ DÒ ${zone.toUpperCase()}`}
                </h2>
              </div>
              <div className="grid grid-rows-2 gap-4 justify-items-center text-black p-2">
                <button
                  onClick={() => {
                    setShowAll(!showAll);
                  }}
                  className="w-full flex items-center border-2 border-gray-200 p-1 rounded-md"
                >
                  <AiFillEye className="text-2xl font-bold mr-2" />{" "}
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
                  <BsFillCalendarCheckFill className="text-2xl font-bold mr-2" />{" "}
                  <span className="hidden md:flex">Chọn Ngày </span>
                </button>
                <SortOptionsModal
                  openSortOptions={openSortOptions}
                  setOpenSortOptions={setOpenSortOptions}
                  onSort={onSort}
                  station={false}
                />
                <ModalCalendar
                  openCalendarModal={openCalendarModal}
                  setIopenCalendarModal={setIopenCalendarModal}
                  onHandleDatePick={onHandleDatePick}
                />
              </div>
            </div>
            <hr />
          </div>
          <div className="p-4">
            <Search
              className="mb-5"
              placeholder="Nhập Vào Tên Nhà Đài Hay Ngày Xổ"
              size="large"
              enterButton={<SearchOutlined />}
              onSearch={onSearch}
              onChange={onChangeSearchInput}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center">
            {renderCard(sliceLotteriesByZone)}
          </div>
          <div className="flex justify-center my-6">
            <PaginationComponent
              total={lotteriesArr.length}
              perPage={perPage}
              onHandlePage={onHandlePage}
            />
          </div>
        </div>
        <div
          className="lg:col-span-4 flex flex-col items-center"
          style={{ width: "100%" }}
        >
          <div className="hidden lg:flex">
            <CalendarComponent onHandleDatePick={onHandleDatePick} />
          </div>
          <div className="hidden lg:flex mt-2">
            <VerticalSlideCard
              arrLotteries={arrLotteries.slice(0, 12)}
              vertical={true}
              numberCardShow={4}
              header={true}
              compareLotteries={arrLotteries}
            />
          </div>
          <div
            className="flex flex-col items-center lg:hidden"
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
    </CustomCard>
  );
}
