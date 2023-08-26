import styles from "./GeneratedSamples.module.css";

import { useState } from "react";
import Sample from "./Sample";

const GeneratedSamples = ({
  generatedValues,
  setGeneratedValues,
  campaignId,
  resultsRef,
  deleteSample,
  updateHandler,
}) => {
  // Utility function to count the number of lines in a string

  return (
    <>
      {generatedValues && generatedValues.length !== 0 && (
        <div className={styles.results} ref={resultsRef}>
          <div className={styles.header}>
            <h1>Generated Campagins</h1>
            <p>Choose One</p>
          </div>

          <ul className={styles.items}>
            {generatedValues.map((item, num) => (
              <Sample
                item={item}
                num={num}
                key={num}
                campaignId={campaignId}
                setGeneratedValues={setGeneratedValues}
                updateHandler={updateHandler}
                deleteSample={deleteSample}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeneratedSamples;
