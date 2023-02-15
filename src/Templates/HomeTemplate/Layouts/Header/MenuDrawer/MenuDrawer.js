import React from "react";
import { Drawer, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState } from "react";
import { ImHome, ImParagraphLeft } from "react-icons/im";
import { AiOutlineFileSearch } from "react-icons/ai";
import { history } from "../../../../../App";
import { FaRegRegistered, FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

const centerZoneItem = [
  "Bình Định",
  "Gia Lai",
  "Khánh Hòa",
  "Kon Tum",
  "Ninh Thuận",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Trị",
  "Thừa Thiên Huế",
  "Đà Nẵng",
  "Đắk Lák",
  "Đắk Nông",
];

const southZoneItem = [
  "An Giang",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Bạc Liêu",
  "Bến Tre",
  "Cà Mau",
  "Cần Thơ",
  "Hậu Giang",
  "Kiên Giang",
  "Long An",
  "Sóc Trăng",
  "Tiền Giang",
  "Tp. Hồ Chí Minh",
  "Trà Vinh",
  "Tây Ninh",
  "Vĩnh Long",
  "Vũng Tàu",
  "Đà Lạt",
  "Đồng Nai",
  "Đồng Tháp",
];

const vnDayArr = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const displaySubItemMenu = (arr, zone, menu) => {
  return arr.map((item, index) => {
    return getItem(
      <NavLink rel="noopener noreferrer" to={`/${menu}/${zone}/${item}`}>
        {item.toUpperCase()}
      </NavLink>,
      `${zone} - ${index}`
    );
  });
};

const items = [
  getItem(
    <NavLink
      rel="noopener noreferrer"
      to="/home"
      className="flex items-center text-black"
    >
      HOME
    </NavLink>,
    "HOME",
    <ImHome className="text-2xl font-bold mr-1" />
  ),
  getItem(
    <NavLink
      rel="noopener noreferrer"
      to="/lottery"
      className="flex items-center text-black"
    >
      VÉ DÒ
    </NavLink>,
    "LOTTERIES",
    <ImParagraphLeft className="text-2xl font-bold mr-1" />,
    [
      getItem(
        <NavLink
          to={`/lottery/Miền Bắc`}
          className="flex items-center text-black"
        >
          MIỀN BẮC
        </NavLink>,
        "NORTH",
        null,
        displaySubItemMenu(vnDayArr, "Miền Bắc", "lottery")
      ),
      getItem(
        <NavLink
          to={`/lottery/Miền Trung`}
          className="flex items-center text-black"
        >
          MIỀN TRUNG
        </NavLink>,
        "CENTER",
        null,
        displaySubItemMenu(centerZoneItem, "Miền Trung", "lottery")
      ),
      getItem(
        <NavLink
          to={`/lottery/Miền Nam`}
          className="flex items-center text-black"
        >
          MIỀN NAM
        </NavLink>,
        "SOUTH",
        null,
        displaySubItemMenu(southZoneItem, "Miền Nam", "lottery")
      ),
    ]
  ),
  getItem(
    <NavLink
      rel="noopener noreferrer"
      to="/ticket"
      className="flex items-center text-white"
    >
      DÒ VÉ
    </NavLink>,
    "TICKET",
    <AiOutlineFileSearch className="text-2xl font-bold mr-1" />
  ),
];

const rootSubmenuKeys = ["HOME", "LOTTERIES", "TICKET"];

export default function MenuDrawer(props) {
  const { open, onClose, getLogout, userLogin } = props;
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderLogin = () => {
    if (Object.values(userLogin).length < 1) {
      return (
        <div className="flex justify-center">
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="flex justify-center self-center px-8 py-3 rounded hover:bg-violet-400 hover:border-emerald-800"
          >
            <FaSignInAlt className="text-2xl font-bold mr-1" />
            SIGN IN
          </button>
          <button
            onClick={() => {
              history.push("/signup");
            }}
            className="flex justify-center self-center px-8 py-3 font-semibold rounded hover:bg-violet-400 hover:border-emerald-800"
          >
            <FaRegRegistered className="text-2xl font-bold mr-1" />
            REGISTER
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => {
          const action = getLogout();
          dispatch(action);
        }}
        className="flex justify-center self-center w-full px-8 py-3 font-semibold rounded hover:bg-violet-400 hover:border-emerald-800"
      >
        <FiLogOut className="text-2xl font-bold mr-1" />
        LOGOUT
      </button>
    );
  };

  return (
    <Drawer
      title={
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 text-5xl font-bold text-black"
        >
          <GiTakeMyMoney className="mr-2" />
          LotteryR
        </NavLink>
      }
      placement="left"
      onClose={onClose}
      open={open}
      footer={renderLogin()}
    >
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Drawer>
  );
}
