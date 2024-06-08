import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCustomer } from "../../redux/reducers/User/customer";
import updateRoleAndAddStaff from "../../api/User/updateRoleAndAddStaff";
const UserAdmin = () => {
  const dispatch = useDispatch();
  const { dataCustomer } = useSelector((state) => state.listCustomer);
  useEffect(() => {
    dispatch(listCustomer());
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };
  const handleConfirm = async (id_service, userId) => {
    const response = await updateRoleAndAddStaff(id_service, userId);
    dispatch(listCustomer());
  };
  return (
    <>
      <div className="track-container">
        <h2>Quản lý Người dùng</h2>
        <div className="tracking-header" style={{ fontSize: "13px" }}>
          <div>Họ và tên</div>
          <div>Ngày sinh</div>
          <div>Căn cước công dân</div>
          <div>Địa chỉ</div>
          <div className="adminheader">Email</div>
          <div>Số điện thoại</div>
          <div>Công việc muốn làm</div>
        </div>

        {dataCustomer.length > 0 ? (
          dataCustomer.map((user, index) => (
            <div
              className="tracking-info"
              key={index}
              style={{ fontSize: "13px" }}
            >
              <div>{user.Name}</div>
              <div>{formatTimestamp(user.DOB)}</div>
              <div>{user.CIC}</div>
              <div>{user.Address}</div>

              <div className="adminheader">{user.Email}</div>
              <div>{user.Phone_number}</div>
              <div>{user.ServiceName}</div>
              <div>
                <button
                  className=""
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleConfirm(user.isSignUpStaff, user.id)}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>Không có người dùng đăng kí nhân viên</h2>
        )}
      </div>
    </>
  );
};

export default UserAdmin;
