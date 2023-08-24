import styles from "./Submit.module.css";

const Submit = ({
  website,
  setWebsite,
  setUseWebsite,
  isGenerated,
  generateCampaign,
  isLoading,
  isSaving,
  updateHandler,
}) => {
  return (
    <>
      <div className={styles.main}>
        <button className={styles.save_button} onClick={updateHandler}>
          {isSaving ? "Saving ... " : "Save"}
        </button>

        <div className={styles.optional}>
          <input
            type="text"
            placeholder="website"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          ></input>
          <input type="checkbox" disabled={website === ""} onChange={(e) => setUseWebsite(e.target.checked)}/>
        </div>

        <button className={styles.button} onClick={generateCampaign}>
          {isLoading
            ? "Loading ... "
            : isGenerated
            ? "Regenerate"
            : "Generate Samples"}
        </button>
      </div>
    </>
  );
};

export default Submit;
