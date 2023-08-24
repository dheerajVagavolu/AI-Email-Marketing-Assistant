import { useRouter } from "next/router";
import styles from "./Example.module.css";
import { useState } from "react";

const Example = ({ item }) => {
  const [clicked, setclicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteHandler = async (_id) => {
    try {
      setLoading(true);
      const response = await fetch("/api/campaign/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error(
          `Error deleting item: ${responseData.message || "Unknown error"}`
        );
        return;
      }

      console.log(`Successfully deleted item with _id: ${_id}`);

      // Optionally, you could refresh the data or redirect the user
      // e.g., router.push("/path_to_redirect_after_deletion");
      router.push("/");
    } catch (error) {
      console.error(`Error deleting item with _id: ${_id}`, error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className={styles.example} onClick={() => setclicked(!clicked)}>
      {loading && <div className={styles.loading}>Deleting...</div>}
      {!loading && (
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
                  pathname: "/edit",
                  query: { _id: item._id },
                })
              }
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(item._id);
              }}
            >
              Delete
            </button>
          </div>
        </header>
      )}

      {!loading && clicked && (
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
