import React from "react";
import "./Table.css";

export default function TableLotteryDetail(props) {
  let { lottery } = props;
  return (
    <div className="rounded-lg shadow-xl bg-white p-4 w-full">
      {lottery.stationId && (
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            Bảng Kết Quả Xổ Số {lottery.stationId.name}
          </h1>
          <p className="text-black">Ngày: {lottery.date}</p>
          <hr />
        </div>
      )}
      <table className="table-auto border-collapse text-black rounded-lg w-full">
        <tbody className="table-lotteries text-base">
          <tr className="row-table">
            <th>
              <p>
                {lottery.result.eighthNum.length >= 1
                  ? "Giải Tám:"
                  : "Ký Hiệu Đặc Biệt:"}
              </p>
            </th>
            <td>
              <p
                className={`${
                  lottery.result.eighthNum.length >= 1
                    ? "text-red-500 font-bold text-2xl my-auto number-table"
                    : "font-bold text-2xl my-auto"
                }`}
              >
                {lottery.result.eighthNum.length >= 1
                  ? lottery.result.eighthNum.join(" - ")
                  : lottery.result.signJackpot.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Bảy:</p>
            </th>
            <td>
              <p
                className={`${
                  lottery.result.eighthNum.length < 1
                    ? "text-red-500 font-bold text-2xl my-auto"
                    : "font-bold text-2xl my-auto number-table"
                }`}
              >
                {lottery.result.seventhNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Sáu:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table">
                {lottery.result.sixthNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Năm:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table">
                {lottery.result.fifthNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Bốn:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table">
                {lottery.result.fourthNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Ba:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table">
                {lottery.result.thirdNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Hai:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table" >
                {lottery.result.secondNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Nhất:</p>
            </th>
            <td>
              <p className="font-bold text-2xl my-auto number-table">
                {lottery.result.firstNum.join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Giải Đặc Biệt:</p>
            </th>
            <td>
              <p className="text-red-500 font-bold text-4xl my-auto number-table">
                {lottery.result.jackpot.join(" - ")}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
