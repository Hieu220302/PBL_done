import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../redux/reducers/OderService/orderService";
import { listStaff } from "../../redux/reducers/Staff/staff";
import changeRegistrationTime from "../../api/Staff/changeRegistrationTime";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import changeOrderByStaff from "../../api/OderService/changeOrderByStaff";
import changeStateOrderService from "../../api/OderService/changeStateOrderService";
const OrderAdmin = () => {
  const dispatch = useDispatch();
  const { dataOrder } = useSelector((state) => state.listOrder);
  const { dataStaff } = useSelector((state) => state.listStaff);
  useEffect(() => {
    dispatch(listOrder());
    dispatch(listStaff());
  }, []);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(dataOrder?.length).fill("")
  );
  const state = [
    "Đơn đã xóa",
    "Đơn đã hủy",
    "Đơn chờ xác nhận",
    "Đơn chờ xác nhận hoàn thành",
    "Đơn đã hoàn thành",
    "Đơn nhân viên xin hủy",
  ];
  let groupedByState = {};
  dataOrder.forEach((item) => {
    const state = item.State;
    if (!groupedByState[state]) {
      groupedByState[state] = [];
    }
    groupedByState[state].push(item);
  });
  const staffCancel0 = groupedByState[3]?.filter(
    (order) => order.staffCancel === 0
  );
  const staffCancel1 = groupedByState[3]?.filter(
    (order) => order.staffCancel === 1
  );
  groupedByState[3] = staffCancel0;
  groupedByState[5] = staffCancel1;

  const convertToVietnamTime = (utcDate) => {
    const date = new Date(utcDate);
    const vietnamOffset = 7 * 60 * 60 * 1000;
    const vietnamTime = new Date(date.getTime() + vietnamOffset);
    const day = String(vietnamTime.getUTCDate()).padStart(2, "0");
    const month = String(vietnamTime.getUTCMonth() + 1).padStart(2, "0");
    const year = vietnamTime.getUTCFullYear();
    const hours = String(vietnamTime.getUTCHours()).padStart(2, "0");
    const minutes = String(vietnamTime.getUTCMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  const handleConfirm = async (inforOrder, staffOrder) => {
    console.log(inforOrder, staffOrder);
    let workTime = staffOrder?.Registration_Time?.split(",");
    let code = inforOrder?.code?.split(",");
    for (let i = 0; i < code.length; i++) {
      let position = workTime.indexOf(code[i]);
      if (position !== -1) {
        workTime.splice(position, 1);
      }
    }
    const Registration_Time = workTime?.join(",") || "";
    let response = await changeRegistrationTime(
      staffOrder.id_Staff,
      staffOrder?.Free_time,
      Registration_Time
    );
    response = await changeOrderByStaff(inforOrder.id, 2, null);
    dispatch(listOrder());
    dispatch(listStaff());
  };
  const handleUpdate = async (selectedOption, id, code) => {
    const staff = dataStaff.find(
      (staff) => `${staff.id_Staff}` === selectedOption
    );
    let workTime = staff?.Registration_Time || "";
    if (workTime !== "") workTime = `${workTime},${code}`;
    else workTime = code;
    let freeTime = staff?.Free_time || "";
    let checkFreeTime = convertStrToArr(freeTime);
    let checkDay = convertStrToArr(code);
    let positionDate = checkFreeTime.indexOf(checkDay[0]);
    let time = freeTime.split(",");
    if (positionDate !== -1) {
      if (time[positionDate] === code) {
        time.splice(positionDate, 1);
        freeTime = time.join(",");
      } else {
        if (time[positionDate][0] === "D") {
          if (code.substring(0, 2) === "CT") {
            code = "CS" + code.slice(2);
          } else {
            code = "CT" + code.slice(2);
          }
          time[positionDate] = code;
          freeTime = time.join(",");
        }
      }
    }
    let response = await changeRegistrationTime(
      staff.id_Staff,
      freeTime,
      workTime
    );
    response = await changeOrderByStaff(id, 3, staff.id_Staff);
    dispatch(listOrder());
    dispatch(listStaff());
  };
  const handleChange = (event, index) => {
    const { value } = event.target;
    setSelectedOptions((prevState) => {
      const newSelectedOptions = [...prevState];
      newSelectedOptions[index] = value;
      return newSelectedOptions;
    });
  };
  const convertStrToArr = (string) => {
    if (string === "") return [];
    const arr = string?.split(",");
    const result = arr?.map((item) => item?.split("_")[1]);
    return result;
  };

  const cancelOrder = async (inforOrder) => {
    const response = await changeStateOrderService(
      inforOrder.id,
      1,
      inforOrder.days
    );
    dispatch(listOrder());
  };

  const [selectedState, setSelectedState] = useState(2);

  const handleTabChange = async (event, newValue) => {
    setSelectedState(newValue);
  };
  return (
    <>
      <div className="track-container">
        <h2>Quản lý đơn hàng</h2>
        <div style={{ margin: 20 }}>
          <Tabs value={selectedState} onChange={handleTabChange} centered>
            {state.map((state, index) => (
              <Tab
                label={state}
                key={index}
                value={index}
                style={{
                  marginRight: 20,
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "600",
                }}
              />
            ))}
          </Tabs>
        </div>
        <div className="tracking-header" style={{ fontSize: "13px" }}>
          <div>Chủ đơn</div>
          <div>Số liên hệ</div>
          <div>Dịch vụ</div>
          <div>Địa chỉ</div>
          <div>Thời gian</div>
          <div>Tổng tiền</div>
          <div>Người làm</div>
        </div>

        {groupedByState[selectedState]?.length > 0 ? (
          groupedByState[selectedState]?.map((inforOrder, index) => {
            const selectedOption = selectedOptions[index];
            const staffOrder = dataStaff.find(
              (staff) => staff.id_Staff === inforOrder.id_staff
            );

            return (
              <div
                className="tracking-info"
                key={index}
                style={{ fontSize: "13px" }}
              >
                <div>{inforOrder?.Name}</div>
                <div>{inforOrder?.Phone_number}</div>
                <div>{inforOrder?.Type}</div>
                <div>{inforOrder?.Address}</div>

                <div>{convertToVietnamTime(inforOrder?.Time)}</div>
                <div>{inforOrder?.Total.toLocaleString()} VND</div>
                {selectedState === 2 ? (
                  <div>
                    <select
                      id={`selectOption-${index}`}
                      value={selectedOption}
                      style={{ width: "150px" }}
                      onChange={(event) => handleChange(event, index)}
                    >
                      <option value=""></option>
                      {dataStaff?.map((staff, index) => {
                        let checkFreeTime = convertStrToArr(staff?.Free_time);
                        let checkDay = convertStrToArr(inforOrder?.code);
                        let positionDate = checkFreeTime?.indexOf(checkDay[0]);
                        if (
                          staff?.id_service === inforOrder?.id_group_service &&
                          staff?.id_User !== inforOrder?.id_user &&
                          positionDate !== -1
                        ) {
                          let time = staff?.Free_time?.split(",");
                          if (time) {
                            if (
                              time[positionDate][0] === "D" ||
                              time[positionDate] === inforOrder?.code
                            )
                              return (
                                <option key={index} value={staff?.id_Staff}>
                                  {staff.Name}
                                </option>
                              );
                            else return <></>;
                          } else return <></>;
                        } else return <></>;
                      })}
                    </select>
                  </div>
                ) : (
                  <>
                    {!!staffOrder?.id ? (
                      <div>{staffOrder?.Name}</div>
                    ) : (
                      <div>Chưa có người làm</div>
                    )}
                  </>
                )}
                <div>
                  {selectedState === 2 && (
                    <button
                      className=""
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: !!selectedOption ? "pointer" : "no-drop",
                      }}
                      disabled={!!selectedOption ? false : true}
                      onClick={() =>
                        handleUpdate(
                          selectedOption,
                          inforOrder?.id,
                          inforOrder?.code
                        )
                      }
                    >
                      Cập nhật
                    </button>
                  )}
                  {selectedState === 5 && (
                    <button
                      className=""
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleConfirm(inforOrder, staffOrder)}
                    >
                      Xác nhận
                    </button>
                  )}
                  {selectedState === 2 && (
                    <button
                      className=""
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px",
                        marginLeft: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => cancelOrder(inforOrder)}
                    >
                      Huỷ đơn
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h2>Không có đơn hàng </h2>
        )}
      </div>
    </>
  );
};

export default OrderAdmin;
