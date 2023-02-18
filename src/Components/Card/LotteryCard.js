import React from "react";
import { BsCalendarWeek } from "react-icons/bs";
import { DOMAIN } from "../../Utils/settings/Configs";
import { isNew, coverDateToDayVn } from "../../Utils/helper/helperFunction";
// import { useSelector } from "react-redux";

export default function LotteryCard(props) {
  // const { arrLotteries } = useSelector((state) => state.ManageLotteriesReducer);
  const { lottery, compareLotteries } = props;
  let newLottery;
  let filterArrLotteries;

  filterArrLotteries = compareLotteries.filter((item) => {
    return (
      item.stationId.name.toLowerCase() === lottery.stationId.name.toLowerCase()
    );
  });

  if (lottery.stationId.zoneCode === "MB01") {
    filterArrLotteries = filterArrLotteries.filter((item) => {
      return coverDateToDayVn(item.date) === coverDateToDayVn(lottery.date);
    });
  }

  if (filterArrLotteries.length > 0) {
    newLottery = isNew(lottery.date, filterArrLotteries);
  } else {
    newLottery = false;
  }

  let imgSrc;

  if (lottery.imgUrl.includes("https:/")) {
    imgSrc = lottery.imgUrl;
  } else {
    imgSrc = DOMAIN + "/" + lottery.imgUrl;
  }

  return (
    <div
      className={`
        w-52 md:w-60 lg:w-72 
        flex flex-col 
        rounded-lg shadow-xl 
        border-2 border-gray-200 
        hover:border-gray-400 
        relative
        bg-blue-card
      `}
    >
      <div className="text-black p-2 flex justify-start items-center gap-2">
        <div>
          <img
            src={DOMAIN + "/" + lottery.stationId.imgUrl}
            alt="logo"
            className="w-20 rounded-md"
          />
        </div>
        <div className="flex justify-start items-center w-full">
          <h4 className="text-sm font-bold text-center border-b-2 border-black">
            VÉ DÒ {lottery.stationId.name.toUpperCase()}{" "}
            {lottery.stationId.zoneCode === "MB01"
              ? " - " + coverDateToDayVn(lottery.date).toLocaleUpperCase()
              : ""}
          </h4>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${imgSrc}')`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={imgSrc}
          alt={lottery.stationId.name}
          className={`opacity-0 w-1/2 h-28`}
        />
      </div>
      <div className="text-black p-2">
        <p className="flex border-t-2 border-black pt-2">
          <BsCalendarWeek className="text-xl mr-2" /> NGÀY: {lottery.date}
        </p>
      </div>
      {newLottery && (
        <div
          className="
          flex flex-row justify-between items-start
          bg-red-500 opacity-60
          text-white 
          p-1 w-1/5 lg:w-1/6 h-10 lg:h-14 
          absolute -top-2 right-2 
        "
        >
          <p
            className="
              font-normal lg:font-bold 
              text-center 
              text-sm lg:text-base
            "
          >
            NEW
          </p>
        </div>
      )}
    </div>
  );
}
