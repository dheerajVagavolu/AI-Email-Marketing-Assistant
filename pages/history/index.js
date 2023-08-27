import Navbar from "@/components/UI/Navbar/Navbar";
import styles from "./index.module.css";

import EmailDiffComponent from "./sample";
const History = ({ data }) => {
  return (
    <div className={styles.main}>
      <Navbar />
      <p style={{padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#999'}}><em>Leverage the power of AI to automatically customize emails to your taste.</em></p>
      {data ? (
        data.length > 0 ? (
          <div className={styles.container}>
            {data.map((item, index) => (
              <EmailDiffComponent key={index} {...item} />
            ))}
          </div>
        ) : (
          <p style={{ padding: "4rem" }}>Make some edits to see change history.</p>
        )
      ) : (
        <p>Error: Email data is not available.</p>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  const historyData = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/emailData/emailsWithHistory"
  );
  const data = await historyData.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

export default History;
