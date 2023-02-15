import React from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

export default function BreadcrumbComponent(props) {
  let { url, lottery } = props;
  let arrUrl = url.split("/");

  return (
    <div className="mb-4 text-black bg-white w-full md:w-1/2 p-2 rounded-md">
      <Breadcrumb separator=">">
        {arrUrl.map((item, index) => {

          if (item === "") {
            return (
              <Breadcrumb.Item key={index}>
                <NavLink to={joinPath(arrUrl, index)}>HOME</NavLink>
              </Breadcrumb.Item>
            );
          }

          if (lottery && index === (arrUrl.length -1)) {
            return (
              <Breadcrumb.Item key={index}>
                <NavLink to={joinPath(arrUrl, index)}>NGÀY {lottery.date}</NavLink>
              </Breadcrumb.Item>
            );
          }

          return (
            <Breadcrumb.Item key={index}>
              <NavLink to={joinPath(arrUrl, index)}>{item.toUpperCase()}</NavLink>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

const joinPath = (arrPath, index) => {
  let strJoin;

  if (index === 0) {
    strJoin = "/";
  } else {
    strJoin = arrPath.slice(0, index + 1);
    strJoin = strJoin.join("/");
  }

  return strJoin;
};
