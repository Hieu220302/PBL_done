import { faBox, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./style.css";
const MenuAdmin = () => {
  return (
    <>
      <div className="menu-admin">
        <div className="menuadmin">
          <label>
            <FontAwesomeIcon icon={faUsers} />
            &nbsp;&nbsp;
            <Link to="/home">Quản lý người dùng</Link>
          </label>
        </div>

        <div className="menuadmin">
          <label>
            <FontAwesomeIcon icon={faBox} />
            &nbsp;&nbsp;
            <Link to="/order">Quản lý đơn dịch vụ</Link>
          </label>
        </div>
        <div className="menuadmin">
          <label>
            <FontAwesomeIcon icon={faChartLine} />
            &nbsp;&nbsp;
            <Link to="/admin/revenue">Doanh thu</Link>
          </label>
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
