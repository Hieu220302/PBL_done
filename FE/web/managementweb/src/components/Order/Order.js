import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuAdmin from "../Menu/Menu";
import OrderAdmin from "./OrderAdmin";
// import "./style.css";
const Order = () => {
  return (
    <section className="shop">
      <div className="d_flex">
        <MenuAdmin />
        <div className="contentWidth">
          <OrderAdmin />
        </div>
      </div>
    </section>
  );
};

export default Order;
