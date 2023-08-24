import RadioForm from "@/components/ParameterForm";
import styles from "./Campaign.module.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const Campaign = ({ isConnected }) => {
  const [generatedValues, setGeneratedValues] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Check if the ref is attached and if the values are populated
    if (resultsRef.current && generatedValues.length > 0) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [generatedValues]);

  const router = useRouter();

  const selectEmail = (value, index) => {
    localStorage.setItem("selectedEmailBody", value.body);
    localStorage.setItem("selectedEmailSubject", value.subject);
    const storedEmail = localStorage.getItem("selectedEmailBody");
    setSelectedItem(index);
    if (storedEmail) {
      router.push("/send");
    } else {
      alert("Some Error Occurred!");
    }
  };

  const handleGeneratedValues = (values) => {
    setGeneratedValues(values);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.form}>
          <h1>{router.query._id}</h1>

          <div className={styles.header}>
            <h3>Create your marketing emails with AI</h3>
            <p>
              Introduce information about your business and the goal of the
              campaign and we'll take care of the rest
            </p>
          </div>
          <RadioForm setGeneratedValues={handleGeneratedValues} />
        </div>

        {generatedValues.length !== 0 && (
          <div className={styles.results} ref={resultsRef}>
            <div className={styles.header}>
              <h1>Generated Campagins</h1>
              <p>Choose One</p>
            </div>

            <ul className={styles.items}>
              {generatedValues.map((item, num) => (
                <li
                  key={num}
                  // Apply styles.item_clicked if this item is the selected one, otherwise apply styles.item
                  className={
                    num === selectedItem ? styles.item_clicked : styles.item
                  }
                  onClick={() => selectEmail(item, num)}
                >
                  <p>{item.subject}</p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      isConnected: false,
    },
  };
}

export default Campaign;
