import React from "react";
import TrainingDetail from "./TrainingDetail";
const AddTraining = () => {
  // po podpięciu reduxa przekazać dane o treningu i koszcie usługi
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
          <TrainingDetail />
          <TrainingDetail />
          <TrainingDetail />
        </tbody>
      </table>
    </div>
  );
};

const centeringContent = {
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between"
};

export default AddTraining;
