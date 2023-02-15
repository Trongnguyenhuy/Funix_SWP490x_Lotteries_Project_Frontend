/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Table, Button, Input } from "antd";
import {
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { RiUserLine, RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { history } from "../../../App";
import { useState } from "react";
import {
  deleteUserAction,
  deleteUsersAdminAction,
  getUsers,
} from "../../../Redux/Actions/ManageUserAction";
import { DOMAIN } from "../../../Utils/settings/Configs";
import {
  getIncludedRowKeys,
  mergeDiffItems,
} from "../../../Utils/helper/helperFunction";
import TicketTable from "./TicketTable/TicketTable";
const { Search } = Input;

export default function ManageUserAdmin() {
  const [dataSearch, setDataSearch] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const [loading, setLoading] = useState(false);
  let data;

  const { arrUsers, arrTickets, userLogin } = useSelector(
    (state) => state.ManageUserReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getUsers();
    dispatch(action);
    start();
    setSearchMode(false);
  }, []);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedUsersId([]);
      setLoading(false);
    }, 1000);
  };

  const deleteAll = () => {
    let formData = new FormData();
    formData.append("users", selectedUsersId);
    let text = `BẠN THỰC SỰ MUỐN XÓA ${selectedUsersId.length} NGƯỜI DÙNG VỪA CHỌN?`;

    if (window.confirm(text) === true) {
      const action = deleteUsersAdminAction(formData);
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
    let mergeSelectedRows = [];
    mergeSelectedRows = mergeDiffItems(selectedRowsId, selectedUsersId);

    if (!selected) {
      mergeSelectedRows = mergeSelectedRows.filter(
        (item) => item !== record.id
      );
    }

    if (mergeSelectedRows.length !== selectedRowsId.length) {
      setSelectedUsersId([...mergeSelectedRows]);
    } else {
      setSelectedUsersId([...selectedRowsId]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: onSelectedRows,
    onSelectAll: onSelectedRows,
    getCheckboxProps: (record) => ({
      disabled: record.isAdmin,
      id: record.id,
    }),
  };

  const hasSelected = selectedUsersId.length > 0;

  const onSearch = (value) => {
    let search = value;
    search = search.toLowerCase();

    let onSearchData = arrUsers?.filter((item) => {
      let username = item.name;
      username = username.toLowerCase();
      let userEmail = item.email;
      userEmail = userEmail.toLowerCase();
      return (
        username.includes(search) ||
        userEmail.includes(search) ||
        item.phoneNumber?.includes(search)
      );
    });

    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedUsersId,
      onSearchData
    );

    setSelectedRowKeys(arrSelectedRowKeys);

    setDataSearch([...onSearchData]);
    setSearchMode(true);
  };

  const onChangeSearchInput = (e) => {
    let search = e.target.value;
    search = search.toLowerCase();

    let onSearchData = arrUsers?.filter((item) => {
      let username = item.name;
      username = username.toLowerCase();
      let userEmail = item.email;
      userEmail = userEmail.toLowerCase();
      return (
        username.includes(search) ||
        userEmail.includes(search) ||
        item.phoneNumber?.includes(search)
      );
    });

    const arrSelectedRowKeys = getIncludedRowKeys(
      selectedUsersId,
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
      title: "VAI TRÒ",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (record) => {
        if (record) {
          return <RiAdminLine className="text-3xl text-red-500" />;
        } else {
          return <RiUserLine className="text-3xl text-blue-500" />;
        }
      },
    },
    {
      title: "AVATAR",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return (
          <img
            style={{
              width: 50,
              height: 50,
            }}
            className="rounded-full"
            src={
              !record.avatar.includes("https://")
                ? DOMAIN + "/" + record.avatar
                : "https://picsum.photos/200"
            }
            alt={`Avata ${record.name}`}
          />
        );
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "TÊN NGƯỜI DÙNG",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return <h2>{record.name}</h2>;
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
      title: "ĐỊA CHỈ EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SỐ ĐIỆN THOẠI",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "",
      key: "x",
      render: (record) => {
        let isAdmin = record.isAdmin;
        let id = record.id;
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={
                id === userLogin.userId && isAdmin
                  ? false
                  : id !== userLogin.userId && isAdmin
                  ? true
                  : false
              }
              type="primary"
              ghost
              size="middle"
              icon={<EditOutlined />}
              onClick={() => {
                history.push(
                  `/administration/manageusers/edituser/${record.id}`
                );
              }}
            />
            <Button
              disabled={isAdmin}
              type="primary"
              ghost
              size="middle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                let text = `BẠN THỰC SỰ MUỐN XÓA NGƯỜI DÙNG NÀY?`;

                if (window.confirm(text) === true) {
                  const action = deleteUserAction(record.id);
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
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
        id: item._id,
        isAdmin: item.isAdmin,
        avatar: item.imgUrl,
      };
    });
  } else {
    data = arrUsers?.map((item, index) => {
      return {
        key: String(index),
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
        id: item._id,
        isAdmin: item.isAdmin,
        avatar: item.imgUrl,
      };
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-8 border-b-2 border-gray-200">
        <h3 className="text-4xl font-bold">QUẢN LÝ NGƯỜI DÙNG</h3>
        <div className="grid grid-col-3 gap-4 py-2">
          <Button
            style={{ padding: 4 }}
            type="primary"
            size="large"
            icon={<FileAddOutlined className="text-2xl" />}
            ghost
            onClick={() => {
              history.push(`/administration/manageusers/addnewuser`);
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
            {`BỎ CHỌN ${hasSelected ? selectedUsersId.length : ""} NGƯỜI DÙNG`}
          </Button>

          <div className={`${hasSelected ? "" : "hidden"}`}>
            <Button type="primary" ghost onClick={deleteAll} size="large">
              {`XÓA TẤT CẢ ${selectedUsersId.length} NGƯỜI DÙNG`}
            </Button>
          </div>
        </div>
      </div>
      <Search
        className="mb-5"
        placeholder="Nhập Vào Tên người dùng, email hay số điện thoại"
        size="large"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
        onChange={onChangeSearchInput}
      />
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => {
            const userId = record.id;
            const isAdmin = record.isAdmin;
            const userTickets = arrTickets.filter(
              (ticket) => ticket.userId === userId
            );

            return (
              <TicketTable
                tickets={userTickets}
                disabled={
                  userId === userLogin.userId && isAdmin
                    ? false
                    : userId !== userLogin.userId && isAdmin
                    ? true
                    : false
                }
              />
            );
          },
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </div>
  );
}
