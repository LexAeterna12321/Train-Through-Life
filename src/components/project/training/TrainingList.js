import React, { Component } from "react";
import TrainingDetail from "./TrainingDetail";
import { Link } from "react-router-dom";
class TrainingList extends Component {
  // po podpięciu reduxa przekazać dane o treningu i koszcie usługi
  state = {
    classes: [{ type: "Crossfit", cost: 40 }, { type: "Cardio", cost: 30 }]
    // totalCost: 0
  };

  randClassTypeId = () => Math.random();

  // calculateTotalTrainingCost = cost => {
  //   let totalCost = this.state.totalCost;
  //   totalCost += cost;
  //   this.setState({ totalCost });
  //   console.log(totalCost);
  // };

  render() {
    const { classes, totalCost } = this.state;
    // const { calculateTotalTrainingCost } = this;

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
            {classes.map(classType => {
              return (
                <TrainingDetail
                  key={this.randClassTypeId()}
                  classes={classType}
                  // calculateTotalTrainingCost={calculateTotalTrainingCost}
                />
              );
            })}
          </tbody>
        </table>
        <h5>Całkowity koszt treningu: {totalCost}</h5>
        <Link to="/dashboard" className="btn">
          Umów spotkanie
        </Link>
      </div>
    );
  }
}

const centeringContent = {
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between"
};

export default TrainingList;
