import React, { useState } from "react";
import { Pagination } from "antd";

export default function PaginationComponent(props) {
  const { total, perPage, onHandlePage } = props;
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    onHandlePage(page);
    setCurrent(page);
  };
  return (
    <Pagination
      defaultCurrent={1}
      pageSize={perPage}
      current={current}
      onChange={onChange}
      total={total}
    />
  );
}
