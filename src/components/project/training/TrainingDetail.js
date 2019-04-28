import React, { Component } from "react";

class TrainingDetail extends Component {
  constructor(props) {
    super(props);
    this.classesRef = React.createRef();
    this.state = {
      orderedClasses: {
        name: "",
        duration: 0,
        totalCost: 0
      }
    };
  }

  activateClasses = () => {
    const ref = this.classesRef.current;
    const name = ref.innerText;
    ref.classList.remove("white-text");
    ref.classList.add("green-text");
    ref.classList.add("text-lighten-1");
    const orderedClasses = { ...this.state.orderedClasses, name };
    this.setState({ orderedClasses });
  };

  ////

  deactivateClasses = () => {
    const ref = this.classesRef.current;
    ref.classList.add("white-text");
    ref.classList.remove("green-text");
    const orderedClasses = {
      ...this.state.orderedClasses,
      name: "",
      duration: 0,
      totalCost: 0
    };
    this.setState({ orderedClasses });
  };

  ////

  incrementDuration = () => {
    const { cost } = this.props.trainerClasses;
    const { orderedClasses } = this.state;

    if (!orderedClasses.name) return;

    let duration = orderedClasses.duration;
    let totalCost = orderedClasses.totalCost;
    totalCost += cost;
    duration += 30;

    // constans + 30min incrementation.

    const newOrderedClasses = {
      ...orderedClasses,
      duration,
      totalCost
    };

    this.setState({ orderedClasses: newOrderedClasses });
  };

  ////

  decrementDuration = () => {
    const { cost } = this.props.trainerClasses;
    const { orderedClasses } = this.state;
    let duration = orderedClasses.duration;
    let totalCost = orderedClasses.totalCost;
    totalCost -= cost;
    duration -= 30;

    const newOrderedClasses = {
      ...orderedClasses,
      duration,
      totalCost
    };

    this.setState({ orderedClasses: newOrderedClasses });
  };

  ////

  render() {
    const { trainerClasses } = this.props;
    const {
      orderedClasses,
      orderedClasses: { totalCost }
    } = this.state;

    return (
      <div
        className="row card blue-grey darken-1 "
        style={{ ...trainingStyle, flexDirection: "column" }}
      >
        <div className="col s12 m10 l8" style={trainingStyle}>
          <div>
            <button
              className={
                orderedClasses.name
                  ? "btn btn-small waves-effect waves-light red  left"
                  : "btn btn-small waves-effect waves-light red disabled left"
              }
              style={buttonsStyle}
              onClick={this.deactivateClasses}
            >
              <i className="material-icons">remove</i>
            </button>

            <button
              className="btn btn-small waves-effect waves-light teal lighten-1 left"
              style={buttonsStyle}
              onClick={this.activateClasses}
            >
              <i className="material-icons">add</i>
            </button>
          </div>

          <p className="flow-text white-text center" ref={this.classesRef}>
            {trainerClasses.name}
          </p>
        </div>
        {/* ------------------------------------------------------------------- */}
        <div className="col s12 m10 l8" style={trainingStyle}>
          <div>
            <button
              className={
                orderedClasses.duration > 0
                  ? "btn btn-small waves-effect waves-light red  left"
                  : "btn btn-small waves-effect waves-light red disabled left"
              }
              style={buttonsStyle}
              onClick={this.decrementDuration}
            >
              <i className="material-icons">remove</i>
            </button>
            <button
              className={
                orderedClasses.name
                  ? "btn btn-small waves-effect waves-light teal lighten-1  left"
                  : "btn btn-small waves-effect waves-light teal lighten-1 disabled left"
              }
              style={buttonsStyle}
              onClick={this.incrementDuration}
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <p className="flow-text  white-text right">
            {orderedClasses.duration}min
          </p>
        </div>
        {/* ------------------------------------------------------------------- */}
        <div
          className="col s12 m10 l8 card blue-grey darken-1"
          style={trainingStyle}
        >
          <div className="col s12 m10 l8">
            <p className="white-text">
              <span className="flow-text left">Cena (zł)</span>
              <span className="flow-text" style={{ padding: "0 20px" }}>
                {orderedClasses.totalCost}
              </span>
            </p>
          </div>
          <div>
            <button
              className={`btn ${
                orderedClasses.name && orderedClasses.duration > 0
                  ? ""
                  : "disabled"
              }`}
              onClick={() =>
                this.props.passOrderedClasses(orderedClasses, totalCost)
              }
            >
              Zatwierdź
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const trainingStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0"
};

const buttonsStyle = {
  margin: "10px",
  width: "70px"
};

export default TrainingDetail;
