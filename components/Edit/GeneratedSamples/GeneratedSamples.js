import styles from "./GeneratedSamples.module.css";

const GeneratedSamples = ({
  generatedValues,
  setGeneratedValues,
  selectedItem,
  resultsRef,
  editSample,
}) => {
  const onChangeHandler = (event, index) => {
    setGeneratedValues((prevState) => {
      // Deep copy of the current state
      const newState = JSON.parse(JSON.stringify(prevState));

      // Update the body content of the particular sample
      newState.preferences.generatedSamples[index].body = event.target.value;

      return newState;
    });
  };

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
              <li
                key={num}
                className={
                  num === selectedItem ? styles.item_clicked : styles.item
                }
                onClick={() => editSample(item, num)}
              >
                <textarea
                  className={styles.sample}
                  defaultValue={item.body}
                  onChange={(e) => onChangeHandler(e, num)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeneratedSamples;
