import { useRouter } from "next/router";
import styles from "./index.module.css";
import DiffViewer from "react-diff-viewer";

const EmailDiffComponent = (data) => {
  const router = useRouter();

  const goToCampaign = () => {
    console.log(data)
    router.push(
      process.env.NEXT_PUBLIC_API_URL + `/edit?_id=${data.campaignId}`
    );
  };

  console.log(data);
  if (!data.history || data.history.length === 0) {
    return <p>No history found.</p>;
  }

  const renderDiffs = () => {
    const diffs = [];

    // Loop through the history and compare each version with the next.
    for (let i = 0; i < data.history.length - 1; i++) {
      diffs.push(
        <div className={styles.viewer} key={i}>
          <DiffViewer
            oldValue={data.history[i]}
            newValue={data.history[i + 1]}
            splitView={false}
            showDiffOnly={true}
          />
          <button className={styles.button} onClick={goToCampaign}>Go to Campaign</button>
        </div>
      );
    }

    // Compare the last history item with the current emailText.
    diffs.push(
      <div className={styles.viewer} key={data.history.length - 1}>
        <DiffViewer
          oldValue={data.history[data.history.length - 1]}
          newValue={data.emailText}
          splitView={false}
          showDiffOnly={true}
        />
        <button className={styles.button} onClick={goToCampaign}>Go to Campaign</button>
      </div>
    );

    return diffs;
  };

  return <div>{renderDiffs()}</div>;
};

export default EmailDiffComponent;
