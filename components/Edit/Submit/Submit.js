import styles from "./Submit.module.css";

const Submit = ({ generateCampaign, isLoading }) => {
  return (
    <>
    
      <div className={styles.main}>
      <button className={styles.save_button} onClick={() => (alert('save'))}>
            Save
        </button>
        {isLoading ? (
          <button className={styles.button} onClick={generateCampaign}>
            Loading
          </button>
        ) : (
          <button className={styles.button} onClick={generateCampaign}>
            Generate Samples
          </button>
        )}
        
      </div>
    </>
  );
};

export default Submit;
