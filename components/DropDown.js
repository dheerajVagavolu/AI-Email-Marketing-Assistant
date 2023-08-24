import React, { useState } from "react";
import styles from "./DropDown.module.css";

const DropdownComponent = ({
  title,
  options,
  dispatch,
  actionType,
  selectedOption,
}) => {
  const handleOptionChange = (event) => {
    dispatch({ type: actionType, payload: event.target.value });
  };

  return (
    <div className={styles.dropdownComponent}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.drop_container}>
        <select
          className={styles.dropdown}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownComponent;
