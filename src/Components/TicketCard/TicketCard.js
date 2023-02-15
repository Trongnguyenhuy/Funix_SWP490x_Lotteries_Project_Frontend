import React from "react";
import moment from "moment";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTicketAdminAction } from "../../Redux/Actions/ManageLotteriesAction";

const TicketCard = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  return (
    <div
      className="
        border-2 border-gray-300 
        rounded-lg shadow-lg 
        hover:border-gray-500 hover:shadow-2xl
        p-6 
        relative
      "
    >
      <div>
        <h2
          className="
            text-lg text-gray-900 
            font-medium title-font 
            mb-2
          "
        >
          VÉ {item.ticket}
        </h2>
      </div>
      <div
        className="
          border-t-2 border-gray-300 
        "
      >
        <p className="leading-relaxed text-base mt-2">
          ĐÀI: {item.station.toUpperCase()}
        </p>
        <p className="leading-relaxed text-base">NGÀY: {item.date}</p>
        <p className="leading-relaxed text-base">
          DÒ VÉ LÚC: {moment(item.timeCheck).format("hh:mm A")} - NGÀY{" "}
          {moment(item.timeCheck).format("DD/MM/YYYY")}
        </p>
      </div>
      <div
        className="
            absolute
            top-3 right-4
          "
      >
        <Button
          type="primary"
          ghost
          size="middle"
          icon={<DeleteOutlined />}
          danger
          onClick={() => {
            let alertText = `BẠN THỰC SỰ MUỐN XÓA VÉ ${item.ticket} - ĐÀI ${item.station.toUpperCase()} ?`;

            if(window.confirm(alertText) === true) {
              const action = deleteTicketAdminAction(item._id);
              dispatch(action);
            }

          }}
        />
      </div>
    </div>
  );
};

export default TicketCard;
