import React from "react";
import styles from "./About.module.css";

const About = ({dispatch, actionType}) => {
  
  const handleOptionChange = (event) => {
    dispatch({ type: actionType, payload: event.target.value });
  };

  return (
    <>
      <div className={styles.main}>
        <h4>Tell us more about the email you want to send</h4>

        <textarea
          rows="10"
          name="description"
          placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus perspiciatis commodi ipsam maxime libero illum ex quaerat aliquid odit tempore cum sunt necessitatibus eum asperiores facilis nam, veritatis ipsum deserunt?"
          className={styles.text_input}
          onChange={handleOptionChange}
        ></textarea>
      </div>
    </>
  );
};

export default About;
