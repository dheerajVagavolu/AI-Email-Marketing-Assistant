import { useRouter } from "next/router";
import FavouriteSample from "../../components/UI/FavouriteSample/FavouriteSample";
import styles from "./index.module.css";
import Navbar from "@/components/UI/Navbar/Navbar";
const Favorites = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.main}>
        <Navbar
          pages={{
            Campaign: () => {
              router.push("/");
            },
            Favorites: () => {
              router.push("/favorites");
            },
          }}
        />
        {data &&
          data.map((item) => (
            <FavouriteSample
              key={item._id}
              _id={item._id}
              deleteFavorite={() => deleteHandler(item._id)}
              email={item.email}
              campaignId={item.campaignId}
            />
          ))}
      </div>
    </>
  );
};
export async function getServerSideProps() {
  const dataJson = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/generations/getAllFavorites"
  );

  const data = await dataJson.json();
  console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export default Favorites;
