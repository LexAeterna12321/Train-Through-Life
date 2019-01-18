import React, { Component } from "react";

class TrainingDetail extends Component {
  constructor(props) {
    super(props);
    this.classesRef = React.createRef();
    this.state = {
      classes: { type: "Crossfit", duration: 0, totalCost: 0 },
      orderedClasses: ""
    };
  }

  activateClasses = () => {
    const ref = this.classesRef.current;
    const type = ref.innerText;
    ref.classList.remove("red-text");
    ref.classList.add("green-text");
    const classes = { ...this.state.classes, type };
    this.setState({ classes, orderedClasses: classes.type });
  };
  deactivateClasses = () => {
    const ref = this.classesRef.current;
    const type = ref.innerText;
    ref.classList.remove("green-text");
    const classes = { ...this.state.classes, type, duration: 0, totalCost: 0 };
    this.setState({ classes, orderedClasses: "" });
  };

  incrementDuration = () => {
    if (!this.state.orderedClasses) return;
    let duration = this.state.classes.duration;
    let totalCost = this.state.classes.totalCost;
    totalCost += 40;
    duration += 30;
    const classes = { ...this.state.classes, duration, totalCost };
    this.setState({ classes });
  };

  decrementDuration = () => {
    let duration = this.state.classes.duration;
    let totalCost = this.state.classes.totalCost;
    totalCost -= 40;
    duration -= 30;
    const classes = { ...this.state.classes, duration, totalCost };
    this.setState({ classes });
  };

  render() {
    return (
      <tr style={centeringContent}>
        <td style={columnsStyle}>
          <button
            className={
              this.state.orderedClasses
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
          <p className="flow-text center" ref={this.classesRef}>
            {this.state.classes.type}
          </p>
        </td>
        {/* ------------------------------------------------------------------- */}
        <td style={columnsStyle}>
          <button
            className={
              this.state.classes.duration > 0
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
              this.state.orderedClasses
                ? "btn btn-small waves-effect waves-light teal lighten-1  left"
                : "btn btn-small waves-effect waves-light teal lighten-1 disabled left"
            }
            // className="btn btn-small waves-effect waves-light teal lighten-1 left"
            style={buttonsStyle}
            onClick={this.incrementDuration}
          >
            <i className="material-icons">add</i>
          </button>
          <p className="flow-text center">{this.state.classes.duration}min</p>
        </td>
        {/* ------------------------------------------------------------------- */}
        <td style={columnsStyle}>
          <button
            className="btn btn-small waves-effect waves-light red disabled left"
            style={{ ...buttonsStyle, transform: "scale(0)" }}
          >
            <i className="material-icons">remove</i>
          </button>
          <button
            className="btn btn-small waves-effect waves-light teal lighten-1 left"
            style={{ ...buttonsStyle, transform: "scale(0)" }}
          >
            <i className="material-icons">add</i>
          </button>{" "}
          <p className="flow-text center">{this.state.classes.totalCost}</p>
        </td>
      </tr>
    );
  }
}
const centeringContent = {
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between"
};
const buttonsStyle = {
  margin: "10px",
  width: "70px"
};

const columnsStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "30px",
  alignItems: "center",
  width: "90%"
};
export default TrainingDetail;
