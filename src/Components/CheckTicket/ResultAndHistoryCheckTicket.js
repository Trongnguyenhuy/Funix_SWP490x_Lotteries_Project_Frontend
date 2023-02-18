import React from "react";
import { useState } from "react";
import PaginationComponent from "../Pagination/Pagination";
import moment from "moment";

export default function ResultAndHistoryCheckTicket(props) {
  let perPage = 6;
  let [page, setPage] = useState(1);

  const { checkTicketResult, checkTicketHistory, userLogin } = props;

  let result = Object.values(checkTicketResult?.result);

  const onHandlePage = (page) => {
    setPage(page);
  };

  let perPageCheckTicketHistory = checkTicketHistory?.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const renderHistory = () => {
    return perPageCheckTicketHistory?.map((item, index) => {
      return (
        <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
          <div 
            className="
              border-1 border-gray-300 rounded-lg
              p-6
              bg-blue-card
            "
          >
            <h2 
              className="
                text-lg 
                text-gray-900 
                font-medium title-font 
                mb-2
                pb-4
                border-b-2 border-black
              "
            >
              VÉ {item.ticket}
            </h2>
            <hr />
            <p className="leading-relaxed text-base mt-2">
              ĐÀI: {item.station.toUpperCase()}
            </p>
            <p className="leading-relaxed text-base">NGÀY: {item.date}</p>
            <p className="leading-relaxed text-base">
              THỰC HIỆN LÚC: {moment(item.timeCheck).format("hh:mm A")} - NGÀY{" "}
              {moment(item.timeCheck).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div 
          className="
            flex flex-wrap flex-col items-center 
            w-full
            mb-20
            text-left
          "
        >
          <div 
            className="
              bg-blue-card
              border-1 border-gray-300 
              rounded-lg
              p-6 w-1/3
            "
          >
            <h2 
              className="
                text-lg 
                text-gray-900 
                font-medium title-font 
                mb-2
                pb-4
                border-b-2 border-black
              "
            >
              THÔNG TIN VỪA DÒ:
            </h2>
            <p className="leading-relaxed text-base mt-2">
              VÉ: {checkTicketResult.ticket}{" "}
            </p>
            <p className="leading-relaxed text-base">
              ĐÀI: {checkTicketResult.station.toUpperCase()}
            </p>
            <p className="leading-relaxed text-base">
              NGÀY: {checkTicketResult.date}
            </p>
            <p className="leading-relaxed text-base">
              THỰC HIỆN LÚC:{" "}
              {moment(checkTicketResult.timeCheck).format("hh:mm A")} - NGÀY{" "}
              {moment(checkTicketResult.timeCheck).format("DD/MM/YYYY")}
            </p>
            {result.map((item, index) => {
              return (
                <p key={index} className="leading-relaxed text-base">
                  KẾT QUẢ: <b>{item.toUpperCase()}</b>
                </p>
              );
            })}
          </div>
        </div>
        <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          LỊCH SỬ DÒ VÉ CỦA BẠN {userLogin.name.toUpperCase()}
        </h2>
        <hr />
        <div className="flex flex-wrap mt-4">{renderHistory()}</div>
        <div className="flex justify-center mt-4">
          <PaginationComponent
            total={checkTicketHistory.length}
            perPage={perPage}
            onHandlePage={onHandlePage}
          />
        </div>
      </div>
    </section>
  );
}
