import { getPosts } from "@/lib/serverFunctions";
import SinglePost from "./SinglePost";
import Header from "@/app/Header";
import Posts from "./Posts";
import WriteForUs from "./WriteForUs";
import Footer from "../components/Footer";

export default async function Home() {
  return (
<>
      <Header />
      <Posts />
      <WriteForUs />
      <div className="bg-blueLight">
      <Footer />
      </div>
      {/* {posts.map((post) => {
        return <SinglePost post={post} />;
      })} */}
    </>
  );
}
