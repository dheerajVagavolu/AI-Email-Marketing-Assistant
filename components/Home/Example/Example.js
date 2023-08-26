import { useRouter } from "next/router";
import styles from "./Example.module.css";
import { useState } from "react";

const Example = ({ item, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div
      className={styles.example}
      onClick={() =>
        router.push({
          pathname: "/edit",
          query: { _id: item._id },
        })
      }
    >
      {loading && <div className={styles.loading}>Deleting...</div>}
      {!loading && (
        <header className={styles.header}>
          <div className={styles.basic}>
            <h2 className={styles.name}>{item.name}</h2>
            <span className={styles.date}>{item.preferences.date}</span>
          </div>
          {onDelete && (
            <div className={styles.actions}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item._id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </header>
      )}

      {!loading && (
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
