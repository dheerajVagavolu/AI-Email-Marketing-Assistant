import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const pages = {
    Campaign: () => {
      router.push("/");
    },
    History: () => {
      router.push("/history");
    },
  };

  return (
    <>
      <div className={styles.navbar}>
        <ul>
          {pages &&
            Object.keys(pages).map((key) => (
              <li
                key={key}
                onClick={
                  pages[key]
                    ? pages[key]
                    : () => {
                        console.log("Navigation not set");
                      }
                }
              >
                {key}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
