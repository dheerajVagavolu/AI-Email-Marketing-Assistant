import styles from "./GeneratedSamples.module.css";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";

const Sample = ({
  campaignId,
  item,
  num,
  setGeneratedValues,
  updateHandler,
  deleteSample,
}) => {
  const onChangeHandler = (event, index) => {
    setGeneratedValues((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.preferences.generatedSamples[index].body = event.target.value;
      return newState;
    });
  };

  const onFavorite = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/generations/favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId,
            email: item.body,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // "Successfully added campaign"
        return data;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("There was an error creating the campaign", error);
    }
  };

  const [generateId, setGenerateId] = useState(null);

  const handleDeleteFavorite = async (_id) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/personalize/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.error(
          `Error deleting item: ${responseData.message || "Unknown error"}`
        );
        return;
      }
      console.log(`Successfully deleted favorite with _id: ${_id}`);
    } catch (error) {
      console.error(`Error deleting item with _id: ${_id}`, error);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const [liked, setLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <li
        key={num}
        // className={num === selectedItem ? styles.item_clicked : styles.item}
        className={styles.item}
      >
        {isEditing ? (
          <>
            <textarea
              className={styles.sample}
              value={item.body}
              onChange={(e) => onChangeHandler(e, num)}
            />
          </>
        ) : (
          <div className={styles.sample_div}>{item.body}</div>
        )}

        <div className={styles.actions}>
          {!isEditing && (
            <EditIcon
              className={styles.editButton}
              onClick={() => startEditing(num)}
            />
          )}
          {isEditing && (
            <SaveIcon
              className={styles.saveButton}
              onClick={async () => {
                await updateHandler();
                stopEditing(num);
              }}
            />
          )}
          <DeleteIcon
            className={styles.deleteButton}
            onClick={() => deleteSample(num)}
          />
          {liked ? (
            <FavoriteIcon
              className={styles.likeButton}
              onClick={() => {
                try {
                  if (generateId) {
                    handleDeleteFavorite(generateId);
                  }
                  setLiked(false);
                } catch {
                  alert("server error 500!");
                  setLiked(true);
                } finally {
                }
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={async () => {
                try {
                  const res = await onFavorite();
                  setGenerateId(res.favoriteId);
                  setLiked(true);
                } catch {
                  alert("server error 500!");
                  setLiked(false);
                } finally {
                }
              }}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default Sample;
