import React, { Component } from "react";
import TrainingDetail from "./TrainingDetail";
import { Link } from "react-router-dom";
import addTraining from "../../store/actions/addTraining";
import { connect } from "react-redux";
class TrainingList extends Component {
  // po podpięciu reduxa przekazać dane o treningu i koszcie usługi
  state = {
    // classes: [{ name: "Crossfit", cost: 40 }, { name: "Cardio", cost: 30 }],
    totalCost: 0,
    orderedClasses: ""
  };

  randClassTypeId = () => Math.random();

  calculateTotalTrainingCost = cost => {
    let totalCost = this.state.totalCost;
    totalCost += cost;
    this.setState({ totalCost });
  };

  passOrderedClasses = orderedClasses => {
    const updatedOrderedClasses = [
      ...this.state.orderedClasses,
      orderedClasses
    ];

    this.setState({
      orderedClasses: updatedOrderedClasses
    });
    this.props.addTraining(orderedClasses);
  };
  render() {
    const { totalCost } = this.state;
    const { trainerClasses } = this.props;
    const { passOrderedClasses } = this;

    const { calculateTotalTrainingCost } = this;

    return (
      <div className="container">
        <table>
          <thead>
            <tr style={centeringContent}>
              <th>Typ aktywności</th>
              <th>Czas Trwania</th>
              <th>Cena (zł)</th>
            </tr>
          </thead>

          <tbody>
            {trainerClasses
              ? trainerClasses.map(classType => {
                  return (
                    <TrainingDetail
                      key={this.randClassTypeId()}
                      trainerClasses={classType}
                      passOrderedClasses={passOrderedClasses}
                      calculateTotalTrainingCost={calculateTotalTrainingCost}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
        {this.state.orderedClasses ? (
          <React.Fragment>
            <div>
              {this.state.orderedClasses.map(oc => (
                <h6>
                  Dodano {oc.name} w czasie: {oc.duration}min. Koszt -{" "}
                  {oc.totalCost}
                </h6>
              ))}
            </div>
            <h6>Całkowity koszt treningu: {totalCost}</h6>
            <Link
              to="/dashboard"
              className="btn"
              onClick={() => {
                this.props.addTraining(this.state.orderedClasses);
              }}
            >
              Umów spotkanie
            </Link>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const centeringContent = {
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between"
};

const mapStateToProps = state => {
  return { trainerClasses: state.trainerClasses.trainerClasses };
};

const mapDispatchToProps = dispatch => {
  return {
    addTraining: training => dispatch(addTraining(training))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingList);
