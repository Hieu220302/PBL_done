import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuAdmin from "../Menu/Menu";
import UserAdmin from "./UserAdmin";
// import "./style.css";
const Home = () => {
  return (
    <section className="shop">
      <div className="d_flex">
        <MenuAdmin />
        <div className="contentWidth">
          <UserAdmin />
        </div>
      </div>
    </section>
  );
};

export default Home;
