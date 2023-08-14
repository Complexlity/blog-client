import Header from "@/app/Header";
import Footer from "@/Components/Footer";
import Posts from "./Posts";
import WriteForUs from "./WriteForUs";

export default async function Home() {
  return (
    <>
      <Header />
      <Posts />
      <WriteForUs />
      <div className="bg-blueLight">
        <Footer />
      </div>
    </>
  );
}
