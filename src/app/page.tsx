import Header from "@/app/Header";
import Footer from "@/Components/Footer";
import Posts from "./Posts";
import WriteForUs from "./WriteForUs";
import { getPosts, getUser } from "@/lib/serverFunctions";

export default async function Home() {
  let posts = await getPosts()
  if(!posts) posts = []
  return (
    <>
      <Header />
      <Posts posts={posts} />
      <WriteForUs />
      <div className="bg-blueLight">
        <Footer />
      </div>
    </>
  );
}
