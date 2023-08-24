import { useState, useEffect } from "react";
import styles from "./send.module.css";
import "react-multi-email/dist/style.css";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import { useRouter } from "next/router";

const Send = (props) => {
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState([]);
  const [storedEmailBody, setStoredEmailBody] = useState("");
  const [storedEmailSubject, setStoredEmailSubject] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmailBody = localStorage.getItem("selectedEmailBody");
    const storedEmailSubject = localStorage.getItem("selectedEmailSubject");

    if (storedEmailBody) {
      setStoredEmailBody(storedEmailBody);
      setStoredEmailSubject(storedEmailSubject);
      localStorage.removeItem("selectedEmailBody");
      localStorage.removeItem("selectedEmailSubject");
    } else {
      alert("Some Error Occurred!");
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.targets}>
            <div className={styles.manual}>
              <p>Enter Recepients</p>
              <form>
                <ReactMultiEmail
                  placeholder="Input your email"
                  emails={emails}
                  onChange={(_emails) => {
                    setEmails(_emails);
                  }}
                  autoFocus={true}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  getLabel={(email, index, removeEmail) => {
                    return (
                      <div data-tag key={index}>
                        <div data-tag-item>{email}</div>
                        <span
                          data-tag-handle
                          onClick={() => removeEmail(index)}
                        >
                          ×
                        </span>
                      </div>
                    );
                  }}
                />
                <br />
              </form>
            </div>
          </div>
          <div className={styles.edits}>
            <textarea
              rows="1"
              name="description"
              defaultValue={storedEmailSubject}
              className={styles.text_input}
            ></textarea>
            <textarea
              rows="10"
              name="description"
              placeholder=""
              className={styles.text_input}
              defaultValue={storedEmailBody}
            ></textarea>
          </div>
          <div className={styles.submissions}>
            <button className={styles.send_button}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Send;
