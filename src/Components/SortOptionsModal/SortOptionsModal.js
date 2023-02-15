import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";

export default function SortOptionsModal(props) {
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { openSortOptions, setOpenSortOptions, onSort, station } = props;

  const onChangeSortOption = (e) => {
    setSortBy(e.target.value);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSort(sortBy);
      setOpenSortOptions(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpenSortOptions(false);
  };
  return (
    <Modal
      open={openSortOptions}
      title="LỰA CHỌN SẮP SẾP"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button type="danger" key="back" onClick={handleCancel}>
          QUAY LẠI
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          XÁC NHẬN
        </Button>,
      ]}
    >
      {!station && (<div className="p-2 mb-2 border-2 border-gray-200 rounded-md">
        <p className="border-b-2 border-gray-200 py-1 font-semibold">
          SẮP XẾP THEO TÊN ĐÀI:
        </p>
        <Radio.Group onChange={onChangeSortOption} value={sortBy}>
          <Radio value={"asc"}>TỪ A TỚI Z</Radio>
          <Radio value={"desc"}>TỪ Z TỚI A</Radio>
        </Radio.Group>
      </div>)}

      <div className="p-2 mb-2 border-2 border-gray-200 rounded-md">
        <p className="border-b-2 border-gray-200 py-1 font-semibold">
          SẮP XẾP THEO NGÀY MỞ THƯỞNG:
        </p>
        <Radio.Group onChange={onChangeSortOption} value={sortBy}>
          <Radio value={"N"}>GẦN TỚI XA</Radio>
          <Radio value={"D"}>XA TỚI GẦN</Radio>
        </Radio.Group>
      </div>
    </Modal>
  );
}
