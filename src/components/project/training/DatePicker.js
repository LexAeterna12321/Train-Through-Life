import React from "react";

const DatePicker = ({ setTrainingDate, date, time, description }) => {
  return (
    <form className="col s12">
      <div className="input-field col s6">
        <input
          type="date"
          placeholder="pick a date"
          id="date"
          onChange={setTrainingDate}
          value={date}
        />{" "}
        <label htmlFor="date">Wybierz datę</label>
      </div>
      <div className="input-field col s6">
        <input
          type="time"
          placeholder="pick a time"
          id="time"
          onChange={setTrainingDate}
          value={time}
        />
        <label htmlFor="date">Wybierz godzinę</label>
      </div>
      <div
        className="input-field col s12"
        style={{ margin: "10px 0", padding: "20px 0" }}
      >
        <textarea
          id="description"
          className="materialize-textarea"
          value={description}
          onChange={setTrainingDate}
        />
        <label htmlFor="description">
          Dodatkowe informacje dla trenera (np. miejsce spotkania, nr telefonu)
        </label>
      </div>
    </form>
  );
};

export default DatePicker;
