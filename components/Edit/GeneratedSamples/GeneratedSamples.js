import styles from './GeneratedSamples.module.css'
import { useState } from 'react';

const GeneratedSamples = ({ generatedValues, selectedItem, resultsRef, editSample }) => {
    
    
  return (
    <>
      {generatedValues.length !== 0 && (
        <div className={styles.results} ref={resultsRef}>
          <div className={styles.header}>
            <h1>Generated Campagins</h1>
            <p>Choose One</p>
          </div>

          <ul className={styles.items}>
            {generatedValues.map((item, num) => (
              <li
                key={num}
                // Apply styles.item_clicked if this item is the selected one, otherwise apply styles.item
                className={
                  num === selectedItem ? styles.item_clicked : styles.item
                }
                onClick={() => editSample(item, num)}
              >
                <p>{item.subject}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeneratedSamples;
