/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Actions/ManageUserAction";
import { DOMAIN } from "../../Utils/settings/Configs";
import {
  RiUserLine,
  RiAdminLine,
  RiMailCheckLine,
  RiPhoneLine,
} from "react-icons/ri";
import { Button } from "antd";
import { history } from "../../App";
import EditProfile from "./edit/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import TicketCard from "../../Components/TicketCard/TicketCard";
import PaginationComponent from "../../Components/Pagination/Pagination";

export default function Profile(props) {
  const { updateUser, arrTickets, userLogin } = useSelector(
    (state) => state.ManageUserReducer
  );
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const { url } = props.match;
  const editMode = url.includes("edit");
  const changePasswordMode = url.includes("changepassword");
  let perPage = 6;
  let [page, setPage] = useState(1);

  const onHandlePage = (page) => {
    setPage(page);
  };

  let perPageTickets = arrTickets?.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    const action = getUser(id);
    dispatch(action);
  }, []);

  return (
    <CustomCard
      style={{ paddingTop: 150, minHeight: "100vh" }}
      effectColor="#fff" // required
      color="#fff" // default color is white
      blur={20} // default blur value is 10px
      borderRadius={0} // default border radius value is 10px
    >
      <div
        className="
          container 
          grid grid-cols-1 lg:grid-cols-4 gap-4
        "
      >
        <div
          className="
            bg-white 
            rounded-md 
            text-black 
            p-4
          "
        >
          <div
            className="
              border-b-2 border-gray-200 
              flex flex-col items-start
            "
          >
            <img
              className="
                rounded-full 
                w-36 h-36
                self-center
                my-4
              "
              src={
                updateUser?.imgUrl?.includes("https://")
                  ? updateUser.imgUrl
                  : DOMAIN + "/" + updateUser.imgUrl
              }
              alt="avatar"
            />
            <div
              className="
                self-center mt-6
              "
            >
              <h1 className="text-3xl font-bold text-center">
                {updateUser?.name}
              </h1>
            </div>
          </div>
          <div
            className={`w-full p-2 ${
              editMode || changePasswordMode ? "hidden" : ""
            }`}
          >
            {updateUser?.isAdmin ? (
              <p className="flex flex-row justify-start gap-2">
                <RiAdminLine className="text-xl text-red-500 font-semibold" /> Quản Trị
                Viên
              </p>
            ) : (
              <p className="flex flex-row justify-start gap-2">
                <RiUserLine className="text-xl text-blue-500 font-semibold" /> Người
                Dùng Thường
              </p>
            )}
            <p
              className="
                flex flex-row justify-start gap-2
                font-normal
              "
            >
              <span>
                <RiMailCheckLine className="mt-1 text-xl font-semibold" />
              </span>
              <b>EMAIL:</b>
              <span>{updateUser?.email}</span>
            </p>
            <p
              className="
                flex flex-row justify-start gap-2
                font-normal
              "
            >
              <span>
                <RiPhoneLine className="mt-1 text-xl font-semibold" />
              </span>
              <b>SỐ ĐIỆN THOẠI:</b>
              <span>{updateUser?.phoneNumber}</span>
            </p>
            <div
              className="
                flex flex-col gap-4
              "
            >
              <Button
                onClick={() => {
                  history.push(`/profile/edit/${updateUser.userId}`);
                }}
                type="primary"
                size="middle"
              >
                CHỈNH SỬA THÔNG TIN
              </Button>
              <Button
                onClick={() => {
                  history.push(`/profile/changepassword/${updateUser.userId}`);
                }}
                type="primary"
                size="middle"
              >
                THAY ĐỔI MẬT KHẨU
              </Button>
            </div>
          </div>
          <div
            className={`flex flex-col items-center p-2 ${
              editMode && !changePasswordMode ? "" : "hidden"
            }`}
          >
            <EditProfile updateUser={updateUser} userLogin={userLogin} />
          </div>
          <div
            className={`flex flex-col items-center p-2 ${
              !editMode && changePasswordMode ? "" : "hidden"
            }`}
          >
            <ChangePassword id={id} userLogin={userLogin} />
          </div>
        </div>
        <div
          className="
            col-span-1 lg:col-span-3
            bg-white 
            rounded-md 
            text-black 
            p-4
          "
        >
          <h2
            className="
              text-2xl md:text-3xl 
              font-medium title-font 
              mb-2 p-4
              text-gray-900
              border-b-2 border-gray-300
            "
          >
            LỊCH SỬ DÒ VÉ CỦA BẠN {updateUser?.name?.toUpperCase()}
          </h2>
          <div
            className="
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
              p-2
            "
          >
            {perPageTickets.map((ticket) => {
              return <TicketCard item={ticket} key={ticket._id} />;
            })}
          </div>
          <div
            className="
              flex flex-row justify-center lg:justify-end
              mt-8
            "
          >
            <PaginationComponent
              total={arrTickets.length}
              perPage={perPage}
              onHandlePage={onHandlePage}
            />
          </div>
        </div>
      </div>
    </CustomCard>
  );
}
