import React from "react";
import styles from "./About.module.css";

const About = ({handleOptionChange,saved}) => {
  
  return (
    <>
      <div className={styles.main}>
        <h4>Tell us more about the email you want to send</h4>

        <textarea
          rows="10"
          name="description"
          placeholder="(Ex. what is the goal? what is the expected result?)"
          defaultValue={saved ? saved : ""}
          className={styles.text_input}
          onChange={(e) => handleOptionChange(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default About;
