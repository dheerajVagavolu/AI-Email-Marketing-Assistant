import styles from "./Submit.module.css";

const Submit = ({
  website,
  useWebsite,
  setWebsite,
  setUseWebsite,
  handleOptionChange,
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
          {isSaving ? " ... " : "Save Preferences"}
        </button>
        <div className={styles.optionalWrapper}>
          <p
            style={{
              padding: "1rem 2rem",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#999",
            }}
          >
            <em>Enter Website to set the tone of the emails! (optional)</em>
          </p>
          <div className={styles.optional}>
            <input
              type="text"
              placeholder="Use Website"
              defaultValue={website}
              className={styles.website_name}
              onChange={(e) => {
                handleOptionChange("website", e.target.value);
                setWebsite(e.target.value);
              }}
            ></input>
            <input
              type="checkbox"
              defaultChecked={useWebsite}
              disabled={website === ""}
              onChange={async (e) => {
                await handleOptionChange("useWebsite", e.target.checked);
                await setUseWebsite(e.target.checked);
              }}
            />
          </div>
        </div>

        <button
          className={styles.button}
          onClick={async (e) => {
            await generateCampaign(e);
            setTimeout(() => {
              updateHandler();
            }, 1000);
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
