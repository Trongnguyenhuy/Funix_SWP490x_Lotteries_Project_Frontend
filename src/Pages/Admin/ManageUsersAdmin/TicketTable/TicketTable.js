import React from "react";
import { Table, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTicketAdminAction } from "../../../../Redux/Actions/ManageLotteriesAction";
import { modifyStationName } from "../../../../Utils/helper/helperFunction";
import moment from "moment";

const TicketTable = (props) => {
  const dispatch = useDispatch();
  const { tickets, disabled } = props;
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "VÉ SỐ",
      dataIndex: "ticket",
      key: "ticket",
      render: (record) => {
        return <h2>{record}</h2>;
      },
      sorter: (a, b) => {
        const ticketA = a.ticket;
        const ticketB = b.ticket;
        if (ticketB < ticketA) {
          return -1;
        }
        if (ticketB > ticketA) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "NHÀ ĐÀI",
      dataIndex: "station",
      key: "station",
      render: (record) => {
        return <p>{record.toUpperCase()}</p>;
      },
      sorter: (a, b) => {
        const stationA = modifyStationName(a.station);
        const stationB = modifyStationName(b.station);
        if (stationB < stationA) {
          return -1;
        }
        if (stationB > stationA) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "THỜI GIAN THỰC HIỆN",
      dataIndex: "timeCheck",
      key: "timeCheck",
      render: (record) => {
        return (
          <p>
            {moment(record).format("hh:mm A")} - NGÀY{" "}
            {moment(record).format("DD/MM/YYYY")}
          </p>
        );
      },
      sorter: (a, b) => {
        const timeA = new Date(a.timeCheck);
        const timeB = new Date(b.timeCheck);

        return timeA - timeB;
      },
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <div
            className="
                flex flex-row justify-center
            "
          >
            <Button
              disabled={disabled}
              type="primary"
              ghost
              size="middle"
              icon={<CloseCircleOutlined />}
              danger
              onClick={() => {
                let alertText = `BẠN THỰC SỰ MUỐN XÓA VÉ ${
                  record.ticket
                } - ĐÀI ${record.station.toUpperCase()} ?`;

                if (window.confirm(alertText) === true) {
                  const action = deleteTicketAdminAction(record.id);
                  dispatch(action);
                }
              }}
            />
          </div>
        );
      },
    },
  ];
  const data = tickets.map((ticket, index) => {
    return {
      index: index + 1,
      key: ticket._id,
      id: ticket._id,
      ticket: ticket.ticket,
      station: ticket.station,
      timeCheck: ticket.timeCheck,
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default TicketTable;
