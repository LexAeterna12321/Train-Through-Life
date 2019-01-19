import React, { Component } from "react";

class TrainingDetail extends Component {
  constructor(props) {
    super(props);
    this.classesRef = React.createRef();
    this.state = {
      orderedClasses: { type: "", duration: 0, totalCost: 0 }
    };
  }

  // wynieść totalCost wyżej żeby sumować kwoty z paru treningów
  // treningi też poziom wyżej w TrainingList najlepiej w tablicy. Potem mapowanie w zamówionych treningach
  ////

  activateClasses = () => {
    const ref = this.classesRef.current;
    const type = ref.innerText;
    ref.classList.remove("red-text");
    ref.classList.add("green-text");
    const orderedClasses = { ...this.state.orderedClasses, type };
    this.setState({ orderedClasses });
  };

  ////

  deactivateClasses = () => {
    const ref = this.classesRef.current;
    // const type = ref.innerText;
    ref.classList.remove("green-text");
    const orderedClasses = {
      ...this.state.orderedClasses,
      type: "",
      duration: 0,
      totalCost: 0
    };
    this.setState({ orderedClasses });
  };

  ////

  incrementDuration = () => {
    const { cost } = this.props.classes;
    const { orderedClasses } = this.state;
    // const { calculateTotalTrainingCost } = this.props;
    if (!orderedClasses.type) return;

    let duration = orderedClasses.duration;
    let totalCost = orderedClasses.totalCost;
    totalCost += cost;
    duration += 30;

    // calculateTotalTrainingCost(totalCost);
    // constans + 30min incrementation.

    const newOrderedClasses = {
      ...orderedClasses,
      duration,
      totalCost
    };
    console.log({ newOrderedClasses });
    this.setState({ orderedClasses: newOrderedClasses });
  };

  ////

  decrementDuration = () => {
    const { cost } = this.props.classes;
    const { orderedClasses } = this.state;
    // const { calculateTotalTrainingCost } = this.props;
    let duration = orderedClasses.duration;
    let totalCost = orderedClasses.totalCost;
    totalCost -= cost;
    duration -= 30;

    // calculateTotalTrainingCost(totalCost);

    const newOrderedClasses = {
      ...orderedClasses,
      duration,
      totalCost
    };
    this.setState({ orderedClasses: newOrderedClasses });
  };

  ////

  render() {
    const { classes } = this.props;
    const { orderedClasses } = this.state;

    console.log(this.state);

    return (
      <tr style={centeringContent}>
        <td style={columnsStyle}>
          <button
            className={
              orderedClasses.type
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
            {classes.type}
          </p>
        </td>
        {/* ------------------------------------------------------------------- */}
        <td style={columnsStyle}>
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
              orderedClasses.type
                ? "btn btn-small waves-effect waves-light teal lighten-1  left"
                : "btn btn-small waves-effect waves-light teal lighten-1 disabled left"
            }
            // className="btn btn-small waves-effect waves-light teal lighten-1 left"
            style={buttonsStyle}
            onClick={this.incrementDuration}
          >
            <i className="material-icons">add</i>
          </button>
          <p className="flow-text center">{orderedClasses.duration}min</p>
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
          <p className="flow-text center">{orderedClasses.totalCost}</p>
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
