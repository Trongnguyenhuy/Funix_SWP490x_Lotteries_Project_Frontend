import React from "react";
// import { useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import {
  UserOutlined,
  FileAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { GiTakeMyMoney } from "react-icons/gi";
import { useSelector } from "react-redux";
import { ImParagraphLeft } from "react-icons/im";
import { RiAdminLine, RiBaseStationFill } from "react-icons/ri";
import { getLogout } from "../../Redux/Actions/ManageUserAction";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { history } from "../../App";
// import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

const arrMenuItems = [
  {
    key: "11",
    icon: React.createElement(DashboardOutlined),
    label: <NavLink to="/administration">DASHBOARD</NavLink>,
  },
  {
    key: "2",
    icon: React.createElement(UserOutlined),
    label: "QUẢN LÝ NGƯỜI DÙNG",
    children: [
      {
        key: "21",
        icon: React.createElement(UserOutlined),
        label: <NavLink to="/administration/manageusers">NGƯỜI DÙNG</NavLink>,
      },
      {
        key: "22",
        icon: React.createElement(FileAddOutlined),
        label: (
          <NavLink to="/administration/manageusers/addnewuser">
            THÊM MỚI
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "3",
    icon: React.createElement(ImParagraphLeft),
    label: "QUẢN LÝ VÉ DÒ",
    children: [
      {
        key: "31",
        icon: React.createElement(ImParagraphLeft),
        label: <NavLink to="/administration/managelotteries">VÉ DÒ</NavLink>,
      },
      {
        key: "32",
        icon: React.createElement(FileAddOutlined),
        label: (
          <NavLink to="/administration/managelotteries/addnewlotteries">
            THÊM MỚI
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "43",
    icon: React.createElement(RiBaseStationFill),
    label: "QUẢN LÝ NHÀ ĐÀI",
    children: [
      {
        key: "41",
        icon: React.createElement(RiBaseStationFill),
        label: <NavLink to="/administration/managestations">NHÀ ĐÀI</NavLink>,
      },
      {
        key: "42",
        icon: React.createElement(FileAddOutlined),
        label: (
          <NavLink to="/administration/managestations/addnewstations">
            THÊM MỚI
          </NavLink>
        ),
      },
    ],
  },
  // {
  //   key: "4",
  //   icon: React.createElement(ImStatsBars),
  //   label: <NavLink to="/administration/statics">QUẢN LÝ THỐNG KÊ</NavLink>,
  // },
];

export default function AdminTemplate(props) {
  document.title = "Quản Trị Admin";
  const { path } = props;
  const arrUrl = path.split("/");
  const lengthArrUrl = arrUrl.length;

  let openKey;

  switch (arrUrl[lengthArrUrl - 1]) {
    case "manageusers": {
      openKey = "21";
      break;
    }

    case "managelotteries": {
      openKey = "31";
      break;
    }

    case "managestations": {
      openKey = "41";
      break;
    }

    case "statics": {
      openKey = "4";
      break;
    }

    case "addnewusers": {
      openKey = "22";
      break;
    }

    case "editusers": {
      openKey = "21";
      break;
    }

    case "addnewlotteries": {
      openKey = "32";
      break;
    }

    case "editlotteries": {
      openKey = "31";
      break;
    }

    case "addnewstations": {
      openKey = "42";
      break;
    }

    case "editstations": {
      openKey = "41";
      break;
    }

    default:
      openKey = "11";
  }

  const { Component, ...restProps } = props;

  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  if (!userLogin.isAdmin) {
    alert(
      "Bạn Không Có Quyền Admin, Liên Hệ Người Quản Trị Để Được Cấp Quyền !"
    );
    return history.push("/home");
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Layout hasSider>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <div className="logo">
                <NavLink
                  to="/home"
                  className="flex items-center p-2 text-4xl font-bold text-white"
                >
                  <GiTakeMyMoney className="mr-2" />
                  LotteryR
                </NavLink>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultOpenKeys={[openKey[0]]}
                selectedKeys={[openKey]}
                items={arrMenuItems}
              />
            </Sider>
            <Layout
              className="site-layout"
              style={{
                marginLeft: 200,
              }}
            >
              <Header
                style={{
                  padding: "4rem",
                  background: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  className="
                      flex flex-row justify-start items-center gap-4
                      border-1 border-blue-500 rounded-md shadow-md 
                      p-4 my-1
                    "
                >
                  <Button
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    type="primary"
                    ghost
                    shape="circle"
                    size="large"
                    icon={
                      <RiAdminLine className="text-3xl font-bold text-red-500" />
                    }
                  />
                  <p
                    className="
                      text-center 
                      text-base font-normal
                      mt-2
                    "
                  >
                    Xin Chào! {userLogin?.name?.toUpperCase()}.
                  </p>
                </div>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginRight: "1%",
                    marginLeft: "1%",
                  }}
                  type="danger"
                  onClick={() => {
                    const action = getLogout();
                    dispatch(action);
                  }}
                  icon={<FiLogOut className="text-xl font-bold mr-1" />}
                  ghost
                  size="middle"
                >
                  LOGOUT
                </Button>
              </Header>
              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "initial",
                }}
              >
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: "white",
                  }}
                >
                  <Component {...propsRoute} />
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                LotteryR ©2022 Created by LotteryR
              </Footer>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}
