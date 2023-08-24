import { useRouter } from "next/router";
import styles from "./Example.module.css";
import { useState } from "react";

const Example = ({ item }) => {
  const [clicked, setclicked] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.example} onClick={() => setclicked(!clicked)}>
      <header className={styles.header}>
        <div className={styles.basic}>
          <h2 className={styles.name}>{item.name}</h2>
          <span className={styles.date}>{item.preferences.date}</span>
        </div>
        <div className={styles.actions}>
          <span className={styles.date}>{item._id}</span>
          <button
            onClick={() =>
              router.push({
                pathname: "/campaign",
                query: { _id: item._id },
              })
            }
          >
            Edit
          </button>
        </div>
      </header>
      {clicked && (
        <div className={styles.info}>
          <ul className={styles.inDepth}>
            <li>
              <strong>Campaign Goal:</strong>{" "}
              {!item.preferences.campaignGoal
                ? "Not Set"
                : item.preferences.campaignGoal}
            </li>
            <li>
              <strong>Brand Tone:</strong>{" "}
              {!item.preferences.brandTone
                ? "Not Set"
                : item.preferences.brandTone}
            </li>
            <li>
              <strong>Industry:</strong>{" "}
              {!item.preferences.industry
                ? "Not Set"
                : item.preferences.industry}
            </li>
          </ul>
          <p className={styles.desc}>
            {!item.preferences.description
              ? "(Description Not Set)"
              : item.preferences.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Example;
