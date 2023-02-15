/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaSignInAlt, FaRegRegistered } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImHome, ImParagraphLeft } from "react-icons/im";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu } from "antd";
import { NavLink } from "react-router-dom";
import MenuNavbar from "./Menu";
import { history } from "../../../../App";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLogout } from "../../../../Redux/Actions/ManageUserAction";
import { DOMAIN } from "../../../../Utils/settings/Configs";
import MenuDrawer from "./MenuDrawer/MenuDrawer";
import { useState } from "react";
import Cookies from "js-cookie";

const menuLotteries = (
  <Menu
    items={[
      {
        key: "lottery 1",
        label: <MenuNavbar menu={"lottery"} />,
      },
    ]}
  />
);

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const { userLogin } = useSelector((state) => state.ManageUserReducer);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const userItem = (
    <Menu
      items={[
        {
          key: "userItem 1",
          label: (
            <button
              onClick={() => {
                history.push(`/profile/${userLogin.userId}`);
              }}
              className="
                flex 
                w-full px-2 py-2 rounded
                font-semibold  
                hover:bg-violet-400 hover:border-emerald-800
              "
            >
              <CgProfile className="text-xl font-bold mr-1" />
              PROFILE
            </button>
          ),
        },
        {
          key: "userItem 2",
          label: (
            <button
              onClick={() => {
                const action = getLogout();
                dispatch(action);
                Cookies.remove("connect.sid", {
                  path: "/",
                  domain: "localhost",
                });
                history.push("/home");
              }}
              className="flex w-full px-2 py-2 font-semibold rounded hover:bg-violet-400 hover:border-emerald-800"
            >
              <FiLogOut className="text-xl font-bold mr-1" />
              LOGOUT
            </button>
          ),
        },
      ]}
    />
  );

  const renderLogin = (userItem) => {
    if (Object.values(userLogin).length < 1) {
      return (
        <>
          <NavLink to="/login" className="text-white">
            <button className="flex justify-center self-center px-8 py-3 rounded hover:bg-violet-400 hover:border-emerald-800">
              <FaSignInAlt className="text-2xl font-bold mr-1" />
              SIGN IN
            </button>
          </NavLink>
          <NavLink to="/signup" className="text-white">
            <button className="flex justify-center self-center px-8 py-3 font-semibold rounded hover:bg-violet-400 hover:border-emerald-800">
              <FaRegRegistered className="text-2xl font-bold mr-1" />
              REGISTER
            </button>
          </NavLink>
        </>
      );
    }
    return (
      <>
        <Dropdown overlay={userItem} placement="bottom" arrow>
          <NavLink
            rel="noopener noreferrer"
            to={`/profile/${userLogin.userId}`}
            className="grid grid-rows-2 gap-2 px-2 text-white justify-items-center"
          >
            <button
              type="button"
              className="row-span-2 h-10 w-10 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img
                className="h-10 w-10 rounded-full"
                src={
                  userLogin?.imgUrl?.includes("https://")
                    ? userLogin.imgUrl
                    : DOMAIN + "/" + userLogin.imgUrl
                }
                alt={userLogin.name}
              />
            </button>
            <p className="text-xs">{userLogin.name.toUpperCase()}</p>
          </NavLink>
        </Dropdown>
      </>
    );
  };

  return (
    <header className="p-4 bg-black bg-opacity-50 text-white w-full fixed top-0 left-0 right-0 z-20">
      <div className="container flex justify-between h-16 mx-auto relative">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 text-5xl font-bold text-white"
        >
          <GiTakeMyMoney className="mr-2" />
          LotteryR
        </NavLink>
        <ul className="items-stretch hidden lg:grid grid-cols-4 gap-4 justify-items-center mt-4">
          <li className="my-auto">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className="flex items-center text-white"
              activeClassName="text-blue-500"
            >
              <ImHome className="text-2xl font-bold mr-1" />
              HOME
            </NavLink>
          </li>
          <li className="my-auto">
            <Dropdown overlay={menuLotteries}>
              <NavLink
                rel="noopener noreferrer"
                to="/lottery"
                className="flex items-center text-white"
                activeClassName="text-blue-500"
              >
                <Space>
                  <ImParagraphLeft className="text-2xl font-bold mr-1" />
                  VÉ DÒ
                  <DownOutlined />
                </Space>
              </NavLink>
            </Dropdown>
          </li>
          <li className="my-auto">
            <NavLink
              rel="noopener noreferrer"
              to="/ticket"
              className="flex items-center text-white"
              activeClassName="text-blue-500"
            >
              <AiOutlineFileSearch className="text-2xl font-bold mr-1" />
              DÒ VÉ
            </NavLink>
          </li>
          {Object.values(userLogin).length < 1 ? (
            ""
          ) : (
            <li className="my-auto">
              <NavLink
                rel="noopener noreferrer"
                to="/administration"
                className="flex items-center text-white"
                activeClassName="text-blue-500"
              >
                <RiAdminLine className="text-2xl font-bold mr-1 text-white" />
                QUẢN TRỊ
              </NavLink>
            </li>
          )}
        </ul>
        <div className="hidden flex-shrink-0 lg:flex items-center">
          {renderLogin(userItem)}
        </div>
        <button
          onClick={() => {
            showDrawer();
          }}
          className="p-4 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <MenuDrawer
          open={open}
          onClose={onClose}
          userLogin={userLogin}
          getLogout={getLogout}
        />
      </div>
    </header>
  );
}
