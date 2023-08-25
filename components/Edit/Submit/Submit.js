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
        <button
          className={styles.save_button}
          onClick={updateHandler}
          disabled={isSaving && isLoading}
        >
          {isSaving ? " ... " : "Save"}
        </button>

        <div className={styles.optional}>
          <input
            type="text"
            placeholder="Use Website"
            className={styles.website_name}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          ></input>
          <input
            type="checkbox"
            disabled={website === ""}
            onChange={(e) => setUseWebsite(e.target.checked)}
          />
        </div>

        <button
          className={styles.button}
          onClick={async (e) => {
            await generateCampaign(e);
          }}
          disabled={isSaving && isLoading}
        >
          {isLoading
            ? " ... "
            : isGenerated
            ? "Regenerate"
            : "Generate Samples"}
        </button>
      </div>
    </>
  );
};

export default Submit;
