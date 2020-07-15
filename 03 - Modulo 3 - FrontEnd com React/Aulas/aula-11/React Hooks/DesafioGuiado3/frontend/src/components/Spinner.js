import React from "react";
import css from "./Spinner.module.css";

export default function Spinner({ description }) {
  return (
    <div className={css.flexRow}>
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginLeft: "10px" }}
      >
        {description}
      </div>
    </div>
  );
}
