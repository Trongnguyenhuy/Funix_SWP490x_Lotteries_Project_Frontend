/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Input, Table, Modal, Button } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteLotteriesAdminAction,
  deleteLotteryAdminAction,
  getLotteriesAction,
} from "../../../Redux/Actions/ManageLotteriesAction";
import { modifyDateString } from "../../../Utils/helper/helperFunction";
import { history } from "../../../App";
import { DOMAIN } from "../../../Utils/settings/Configs";
import {
  getIncludedRowKeys,
  mergeDiffItems,
} from "../../../Utils/helper/helperFunction";
import { AiFillEye } from "react-icons/ai";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useState } from "react";
import TableLotteryDetail from "../../../Components/Table/TableLotteryDetail";

const { Search } = Input;

export default function ManageLotteriesAdmin() {
  const { arrLotteries } = useSelector((state) => state.ManageLotteriesReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyRecord, setKeyRecord] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedLotteriesId, setSelectedLotteriesId] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  let data;

  useEffect(() => {
    const action = getLotteriesAction();
    dispatch(action);
    setSelectedRowKeys([]);
    setSelectedLotteriesId([]);
  }, []);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedLotteriesId([]);
      setLoading(false);
    }, 1000);
  };

  const deleteAll = () => {
    let formData = new FormData();
    formData.append("lotteries", selectedLotteriesId);
    let text = `BẠN THỰC SỰ MUỐN XÓA ${selectedLotteriesId.length} VÉ DÒ VỪA CHỌN?`;

    if (window.confirm(text) === true) {
      const action = deleteLotteriesAdminAction(formData);
      dispatch(action);
      setSearchMode(false);
      start();
    } else {
      start();
    }
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectedRows = (record, selected, selectedRows, nativeEvent) => {
    const selectedRowsId = selectedRows.map((item) => item.id);
    let mergeSelectedRows = []
    mergeSelectedRows = mergeDiffItems(
      selectedRowsId,
      selectedLotteriesId
    );
    
    if(!selected){
      mergeSelectedRows = mergeSelectedRows.filter(item => item !== record.id);
    }
    
    if (mergeSelectedRows.length !== selectedRowsId.length) {
      setSelectedLotteriesId([...mergeSelectedRows]);
    } else {
      setSelectedLotteriesId([...selectedRowsId]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: onSelectedRows,
    onSelectAll: onSelectedRows
  };

  const hasSelected = selectedLotteriesId.length > 0;

  const onSearch = (value) => {
    let search = value;
    search = search.toLowerCase();

    let onSearchData = arrLotteries?.filter((item) => {
      let stationName = item.stationId.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search) || item.date.includes(search);
    });

    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedLotteriesId,
      onSearchData
    );

    setSelectedRowKeys(arrSelectedRowKeys);
    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const onChangeSearchInput = (e) => {
    let search = e.target.value;
    search = search.toLowerCase();

    let onSearchData = arrLotteries?.filter((item) => {
      let stationName = item.stationId.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search) || item.date.includes(search);
    });

    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedLotteriesId,
      onSearchData
    );

    setSelectedRowKeys(arrSelectedRowKeys);
    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "HÌNH ẢNH",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (text, record, index) => {
        if (record.imgUrl?.includes("https:/")) {
          return (
            <img
              width="150"
              height="150"
              className="rounded-sm shadow-lg hover:scale-150"
              src={record.imgUrl}
              alt={`${record.stationName} - Ngày ${record.date}`}
            />
          );
        } else {
          return (
            <img
              width="150"
              height="150"
              className="rounded-sm shadow-lg hover:scale-150"
              src={DOMAIN + "/" + record.imgUrl}
              alt={`${record.stationName} - Ngày ${record.date}`}
            />
          );
        }
      },
    },
    {
      title: "NHÀ ĐÀI",
      dataIndex: "stationName",
      key: "stationName",
      sorter: (a, b) => {
        const nameA = a.stationName.toUpperCase().trim();
        const nameB = b.stationName.toUpperCase().trim();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      render: (text) => {
        return <p className="font-semibold">{text}</p>;
      },
    },
    {
      title: "NGÀY XỔ",
      dataIndex: "date",
      width: "15%",
      sorter: (a, b) => {
        const date1 = new Date(modifyDateString(a.date));
        const date2 = new Date(modifyDateString(b.date));
        return date1 - date2;
      },
    },
    {
      title: "KẾT QUẢ",
      dataIndex: "result",
      key: "result",
      render: (text, record, index) => {
        return (
          <>
            <div className="w-full flex justify-center">
              <Button
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                }}
                type="primary"
                ghost
                size="middle"
                icon={<AiFillEye className="text-2xl font-bold mr-1" />}
                onClick={() => {
                  setKeyRecord(record.key);
                  showModal();
                }}
              >
                HIỂN THỊ
              </Button>
            </div>
            <Modal
              title={`KẾT QUẢ ${record.stationName} - NGÀY ${record.date} `}
              open={isModalOpen && record.key === keyRecord}
              onOk={handleOk}
              onCancel={handleCancel}
              width="50%"
              footer={[
                <div className="flex justify-end">
                  <Button
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyItems: "center",
                    }}
                    key="back"
                    type="primary"
                    onClick={handleCancel}
                    icon={
                      <IoReturnDownBackOutline className="text-2xl font-bold mr-1" />
                    }
                  >
                    BACK
                  </Button>
                </div>,
              ]}
            >
              <TableLotteryDetail lottery={record} />
            </Modal>
          </>
        );
      },
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record, index) => {
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="primary"
              ghost
              size="middle"
              icon={<EditOutlined />}
              onClick={() => {
                history.push(
                  `/administration/managelotteries/editlotteries/${record.id}`
                );
              }}
            />
            <Button
              type="primary"
              ghost
              size="middle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                let text = `BẠN CÓ THỰC SỰ MUỐN XÓA VÉ DÒ ${record.stationName} - Ngày ${record.date} KHÔNG?`;
                if (window.confirm(text) === true) {
                  const action = deleteLotteryAdminAction(record.id);
                  dispatch(action);
                  setSearchMode(false);
                  start();
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  if (searchMode) {
    data = dataSearch?.map((item, index) => {
      return {
        key: String(index),
        id: item._id,
        stationName: item.stationId.name.toUpperCase(),
        date: item.date,
        imgUrl: item.imgUrl,
        result: item.result,
      };
    });
  } else {
    data = arrLotteries?.map((item, index) => {
      return {
        key: String(index),
        id: item._id,
        stationName: item.stationId.name.toUpperCase(),
        date: item.date,
        imgUrl: item.imgUrl,
        result: item.result,
      };
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex justify-between">
          <h3 className="text-4xl font-bold">QUẢN LÝ VÉ DÒ</h3>
          <div className="grid grid-col-3 gap-4">
            <Button
              style={{ padding: 4 }}
              type="primary"
              ghost
              onClick={() => {
                history.push("/administration/managelotteries/addnewlotteries");
              }}
              size="large"
              icon={<FileAddOutlined className="text-2xl" />}
            >
              THÊM MỚI
            </Button>
            <Button
              type="primary"
              ghost
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
              size="large"
            >
              {`BỎ CHỌN ${hasSelected ? selectedLotteriesId.length : ""} VÉ DÒ`}
            </Button>

            <div className={`${hasSelected ? "" : "hidden"}`}>
              <Button type="primary" ghost onClick={deleteAll} size="large">
                {`XÓA TẤT CẢ ${selectedLotteriesId.length} VÉ DÒ`}
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <Search
        className="mb-5"
        placeholder="Nhập Vào Tên Nhà Đài Hay Ngày Xổ"
        size="large"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
        onChange={onChangeSearchInput}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
