import React from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import BreadcrumbComponent from "../../Components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
import CheckTicketPage from "../../Components/CheckTicket/CheckTicketPage";
import ResultAndHistoryCheckTicket from "../../Components/CheckTicket/ResultAndHistoryCheckTicket";
import { changeTabCheckTicketAction } from "../../Redux/Actions/ManageLotteriesAction";

export default function Ticket(props) {
  document.title = "DÒ VÉ";
  const dispatch = useDispatch();

  const callback = (key) => {
    const action = changeTabCheckTicketAction(key);
    dispatch(action);
  };

  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const { checkTicketResult, checkTicketHistory, tabActive } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  const { url } = props.match;

  return (
    <CustomCard
      style={{ paddingTop: 150, minHeight: "100vh" }}
      effectColor="#fff" // required
      color="#fff" // default color is white
      blur={20} // default blur value is 10px
      borderRadius={0} // default border radius value is 10px
    >
      <BreadcrumbComponent url={url} />
      <div className="mt-2 p-4 w-full bg-white rounded-md shadow-md">
        <Tabs defaultActiveKey="1" onChange={callback} activeKey={tabActive}>
          <Tabs.TabPane tab="01 NHẬP VÉ DÒ" key="1">
            <div className="flex justify-center">
              <CheckTicketPage />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="02 XEM KẾT QUẢ"
            key="2"
            disabled={Object.values(checkTicketResult).length < 1}
          >
            <ResultAndHistoryCheckTicket
              checkTicketResult={checkTicketResult}
              checkTicketHistory={checkTicketHistory}
              userLogin={userLogin}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </CustomCard>
  );
}
