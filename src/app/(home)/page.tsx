import Header from "@/app/(home)/Header";
import Posts from "./Posts";
import WriteForUs from "./WriteForUs";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div>
      <Header />
      <Posts />
      <WriteForUs />
      <div className="bg-blueLight">
        <Footer />
      </div>

    </div>
  );
}
