import React from "react";

const Loader = () => {
  return (
    <div className="container loader" style={loaderStyle}>
      <div className="preloader-wrapper big active valign-wrapper center">
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-red">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-yellow">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-green">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
const loaderStyle = {
  position: "fixed",
  zIndex: 3,
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};
export default Loader;
