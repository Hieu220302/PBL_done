import React from "react";
import MenuAdmin from "../Menu/Menu";
import RevenueAdmin from "./RevenueAdmin";

const Revenue = () => {
  return (
    <section className="shop ">
      <div className="d_flex">
        <MenuAdmin />
        <div className="contentWidth">
          <RevenueAdmin />
        </div>
      </div>
    </section>
  );
};

export default Revenue;
