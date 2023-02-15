/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Table, Button, Input } from "antd";
import {
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlinePhoneInTalk, MdHomeWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteStationAction,
  deleteStationsAdminAction,
  getStationsAction,
} from "../../../Redux/Actions/ManageStationsAction";
import { translateDay, mergeDiffItems, getIncludedRowKeys } from "../../../Utils/helper/helperFunction";
import { history } from "../../../App";
import { useState } from "react";
import { DOMAIN } from "../../../Utils/settings/Configs";
const { Search } = Input;

export default function ManageStationsAdmin(props) {
  const [dataSearch, setDataSearch] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedStationsId, setSelectedStationsId] = useState([]);
  const [loading, setLoading] = useState(false);
  let data;

  const { defaultStation } = useSelector(
    (state) => state.ManageStationsReducer
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getStationsAction();
    dispatch(action);
    start();
  }, []);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedStationsId([]);
      setLoading(false);
    }, 1000);
  };

  const deleteAll = () => {
    let formData = new FormData();
    formData.append("stations", selectedStationsId);
    let text = `BẠN THỰC SỰ MUỐN XÓA ${selectedStationsId.length} Đài VỪA CHỌN?`;

    if (confirm(text) === true) {
      const action = deleteStationsAdminAction(formData);
      dispatch(action);
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
      selectedStationsId
    );
    
    if(!selected){
      mergeSelectedRows = mergeSelectedRows.filter(item => item !== record.id);
    }
    
    if (mergeSelectedRows.length !== selectedRowsId.length) {
      setSelectedStationsId([...mergeSelectedRows]);
    } else {
      setSelectedStationsId([...selectedRowsId]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: onSelectedRows,
    onSelectAll: onSelectedRows
  };

  const hasSelected = selectedStationsId.length > 0;

  const onSearch = (value) => {
    let search = value;
    search = search.toLowerCase();

    let onSearchData = defaultStation?.filter((item) => {
      let stationName = item.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search);
    });



    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedStationsId,
      onSearchData
    );

    setSelectedRowKeys(arrSelectedRowKeys);
    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const onChangeSearchInput = (e) => {
    let search = e.target.value;
    search = search.toLowerCase();

    let onSearchData = defaultStation?.filter((item) => {
      let stationName = item.name;
      stationName = stationName.toLowerCase();
      return stationName.includes(search);
    });

    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedStationsId,
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
      title: "MÃ VÙNG",
      dataIndex: "zoneCode",
      key: "zoneCode",
    },
    {
      title: "LOGO",
      dataIndex: "logo",
      key: "logo",
      render: (text, record, index) => {
        return (
          <img
            width="80"
            height="80"
            className="rounded-xl"
            src={
              record.imgUrl !== undefined
                ? DOMAIN + "/" + record.imgUrl
                : "https://picsum.photos/200"
            }
            alt={`Logo ${record.name}`}
          />
        );
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "TÊN NHÀ ĐÀI",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return <h4 className="text-center">{record.name}</h4>;
      },
      sorter: (a, b) => {
        const nameA = a.name.toUpperCase().trim();
        const nameB = b.name.toUpperCase().trim();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "NGÀY MỞ THƯỞNG",
      dataIndex: "weekDay",
      key: "weekDay",
      render: (text, record, index) => {
        let renderWeekDay = record.weekDay.map((item) => {
          return translateDay(item, "vn");
        });

        return renderWeekDay.join(" - ");
      },
    },
    {
      title: "GIỜ MỞ THƯỞNG",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="primary"
              ghost
              size="middle"
              icon={<EditOutlined />}
              onClick={() => {
                history.push(
                  `/administration/managestations/editstations/${record.id}`
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
                let text = `BẠN THỰC SỰ MUỐN XÓA NHÀ ĐÀI NÀY?`;

                if (window.confirm(text) === true) {
                  const action = deleteStationAction(record.id);
                  dispatch(action);
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
        name: item.fullName,
        weekDay: item.open.weekDay,
        time: item.open.time,
        descriptions: item.descriptions,
        id: item._id,
        zoneCode: item.zoneCode,
        imgUrl: item.imgUrl,
      };
    });
  } else {
    data = defaultStation?.map((item, index) => {
      return {
        key: String(index),
        name: item.fullName,
        weekDay: item.open.weekDay,
        time: item.open.time,
        descriptions: item.descriptions,
        id: item._id,
        zoneCode: item.zoneCode,
        imgUrl: item.imgUrl,
      };
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-8 border-b-2 border-gray-200">
        <h3 className="text-4xl font-bold">QUẢN LÝ NHÀ ĐÀI</h3>
        <div className="grid grid-col-3 gap-4 py-2">
          <Button
            style={{ padding: 4 }}
            type="primary"
            size="large"
            icon={<FileAddOutlined className="text-2xl" />}
            ghost
            onClick={() => {
              history.push(`/administration/managestations/addnewstations`);
            }}
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
            {`BỎ CHỌN ${hasSelected ? selectedStationsId.length : ""} NHÀ ĐÀI`}
          </Button>

          <div className={`${hasSelected ? "" : "hidden"}`}>
            <Button type="primary" ghost onClick={deleteAll} size="large">
              {`XÓA TẤT CẢ ${selectedStationsId.length} NHÀ ĐÀI`}
            </Button>
          </div>
        </div>
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
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => {
            let descriptions = record.descriptions; 
            return (
              <div className="grid grid-rows-3 gap-4">
                <p className="flex justify-start">
                  <FaRegAddressCard className="text-2xl mr-2" />
                  <b className="mr-2">ĐỊA CHỈ: </b>
                  {descriptions.address}
                </p>
                <p className="flex justify-start">
                  <MdOutlinePhoneInTalk className="text-2xl mr-2" />
                  <b className="mr-2">PHONE NUMBER: </b>
                  {descriptions.phoneNum}
                </p>
                <p className="flex justify-start">
                  <MdHomeWork className="text-2xl mr-2" />
                  <b className="mr-2">TRANG CHỦ: </b>
                  {descriptions.webSite}
                </p>
              </div>
            );
          },
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
}
