import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  sortName,
  modifyStationName,
} from "../../../../Utils/helper/helperFunction";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const displaySubItemMenu = (arr, zone, menu) => {
  let sortArr = arr.sort((a, b) => {
    return sortName(modifyStationName(a), modifyStationName(b));
  });
  return sortArr.map((item, index) => {
    return getItem(
      <NavLink rel="noopener noreferrer" to={`/${menu}/${zone}/${item}`}>
        {item.toUpperCase()}
      </NavLink>,
      `${zone + "" + index}`,
      null,
      null,
      "group"
    );
  });
};

export default function MenuNavbar(props) {
  const { menu } = props;

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
    "Đắk Lắk",
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

  const items = [
    getItem(
      "Miền Bắc",
      "Miền Bắc",
      <NavLink
        to={`/${menu}/Miền Bắc`}
        className="flex items-center text-black"
      >
        MIỀN BẮC
      </NavLink>,
      displaySubItemMenu(vnDayArr, "Miền Bắc", menu)
    ),
    getItem(
      <NavLink
        to={`/${menu}/Miền Trung`}
        className="flex items-center text-black"
      >
        MIỀN TRUNG
      </NavLink>,
      "MIỀN TRUNG",
      null,
      displaySubItemMenu(centerZoneItem, "Miền Trung", menu)
    ),
    getItem(
      <NavLink
        to={`/${menu}/Miền Nam`}
        className="flex items-center text-black"
      >
        MIỀN NAM
      </NavLink>,
      "MIỀN MIỀN NAM",
      null,
      displaySubItemMenu(southZoneItem, "Miền Nam", menu)
    ),
  ];

  return (
    <Menu
      style={{
        width: 256,
      }}
      mode="vertical"
      items={items}
    />
  );
}
