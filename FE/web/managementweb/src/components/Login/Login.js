import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import loginPage from "../../api/Login/loginApi";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!!user) navigate("home");
  }, []);

  const handleLogin = async (un, pw) => {
    try {
      const response = await loginPage(un, pw);
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        navigate("home");
      }
    } catch (error) {
      alert(
        "Bạn đã đăng nhập thất bại kiểm tra lại mật khẩu và tài khoản của bạn"
      );
    }
  };
  return (
    <div className="loginn">
      <div className="login-container col-12 col-sm-4">
        <div className="title">Đăng nhập</div>
        <div className="text">Tài khoản</div>
        <input
          className="input"
          type="text"
          placeholder="Tài khoản..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <div className="input-2">
          <div className="text">Mật khẩu </div>
          <input
            className="input"
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Mật Khẩu..."
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          className={username && password ? "button-1" : ""}
          disabled={username && password ? false : true}
          onClick={() => handleLogin(username, password)}
        >
          &nbsp;Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
