import RadioForm from "@/components/Edit/Form/ParameterForm";
import styles from "./Edit.module.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import GeneratedSamples from "@/components/Edit/GeneratedSamples/GeneratedSamples";

const Edit = ({ isConnected }) => {
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

  const editSample = (value, index) => {
    // localStorage.setItem("selectedEmailBody", value.body);
    // localStorage.setItem("selectedEmailSubject", value.subject);
    // const storedEmail = localStorage.getItem("selectedEmailBody");
    setSelectedItem(index);
    // if (storedEmail) {
    //   router.push("/");
    // } else {
    //   alert("Some Error Occurred!");
    // }
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

        <GeneratedSamples
          generatedValues={generatedValues}
          resultsRef={resultsRef}
          selectedItem={selectedItem}
          editSample={editSample}
        />
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

export default Edit;
