import React, { useState } from "react";
import { history } from "../../../App";
import { DOMAIN } from "../../../Utils/settings/Configs";
import ModalForCheckTicket from "./ModalForCheckTicket/ModalForCheckTicket";


export default function CheckTicketEntry() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-8 flex flex-col justify-center items-center">
        <div className="bg-blue-card w-full lg:w-4/5 border-2 border-gray-200 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-400">
            DÒ VÉ SỐ VỚI LotteryR
          </h1>
          <div className="text-left text-base grid grid-rows-3 grap-4">
            <div className="row-span-2">
              <p className="hidden lg:flex">
                Bạn muốn xem Xổ Số Miền Bắc, Miền Trung hay Miền Nam ?
              </p>
              <p>
                Ấn vào nút bên dưới để dò vé hoặc đăng ký thành viên để có được
                nhiều ưu đãi đặc biệt từ LotteryR 😍😍😍
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center content-center font-bold">
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="w-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg shadow-2xl"
              >
                DÒ VÉ
              </button>
              <button
                onClick={() => {
                  history.push("/signup");
                }}
                className="w-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg shadow-2xl"
              >
                ĐĂNG KÝ
              </button>
            </div>
            <ModalForCheckTicket
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${DOMAIN + "/images/HeRo.jpg"}')`,
        }}
        className="rounded-r-md"
      >
        <img
          src={DOMAIN + "/images/HeRo.jpg"}
          alt="Ảnh Hero"
          className="w-full rounded-r-md opacity-0"
        />
      </div>
    </div>
  );
}
