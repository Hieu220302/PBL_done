import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../redux/reducers/OderService/orderService";
import { listStaff } from "../../redux/reducers/Staff/staff";

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

  const handleConfirm = async (selectedOption) => {
    console.log(selectedOption);
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
  return (
    <>
      <div className="track-container">
        <h2>Quản lý đơn hàng</h2>
        <div className="tracking-header" style={{ fontSize: "13px" }}>
          <div>Chủ đơn</div>
          <div>Số liên hệ</div>
          <div>Dịch vụ</div>
          <div>Địa chỉ</div>
          <div>Thời gian</div>
          <div>Tổng tiền</div>
          <div>Phân công</div>
        </div>

        {dataOrder?.length > 0 ? (
          dataOrder?.map((inforOrder, index) => {
            const selectedOption = selectedOptions[index];
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
                          console.log(
                            positionDate,
                            time[positionDate][0],
                            inforOrder?.code
                          );
                          if (
                            time[positionDate][0] === "D" ||
                            time[positionDate] === inforOrder?.code
                          )
                            return (
                              <option key={index} value={staff?.id}>
                                {staff.Name}
                              </option>
                            );
                          else return <></>;
                        } else return <></>;
                      } else return <></>;
                    })}
                  </select>
                </div>
                <div>
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
                    onClick={() => handleConfirm(selectedOption)}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Không có người dùng phù hợp</h2>
        )}
      </div>
    </>
  );
};

export default OrderAdmin;
