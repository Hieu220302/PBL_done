import { Link, useNavigate } from "react-router-dom";
import "./headerbusiness.css";
import { useEffect } from "react";
const HeaderAdmin = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {}, []);
  return (
    <>
      <section className="headlogin">
        <div className="headercontainer">
          <Link to="/home">
            <label className="dn">
              <h3 className="h3dn">KÊNH ADMIN</h3>
            </label>
          </Link>
          {user && (
            <div className="menuhearbussiness">
              <div className="account-menu">
                <label>👤 {user.Name}</label>
                <ul>
                  <li>
                    <Link onClick={(e) => handleLogout(e)}>🚪 Đăng xuất</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HeaderAdmin;
