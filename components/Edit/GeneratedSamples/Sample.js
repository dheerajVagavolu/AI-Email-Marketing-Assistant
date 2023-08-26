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
  setIsSaving,
  num,
  setGeneratedValues,
  updateHandler,
  favoriteEmail,
  unfavoriteEmail,
  saveEditedEmail,
  deleteSample,
}) => {
  const [emailBody, setEmailBody] = useState(item.emailText);

  const onChangeHandler = (event, index) => {
    setEmailBody(event.target.value);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  console.log(item);
  const [liked, setLiked] = useState(item.favorite);
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
              defaultValue={item.emailText}
              onChange={(e) => onChangeHandler(e, num)}
            />
          </>
        ) : (
          <div className={styles.sample_div}>{item.emailText}</div>
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
                setIsSaving(true);
                await saveEditedEmail(item._id, emailBody);
                stopEditing(num);
                setIsSaving(false);
              }}
            />
          )}
          <DeleteIcon className={styles.deleteButton} onClick={deleteSample} />
          {liked ? (
            <FavoriteIcon
              className={styles.likeButton}
              onClick={() => {
                try {
                  unfavoriteEmail();
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
                  favoriteEmail();
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
