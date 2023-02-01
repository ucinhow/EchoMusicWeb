import { Banner, HomeToplist, HomeSonglist } from "@src/features";
import PageWrapper from "./PageWrapper";
const Home = () => {
  return (
    <PageWrapper>
      <main className="flex flex-col items-center space-y-8 container">
        <Banner />
        <HomeToplist className="container" />
        <HomeSonglist className="container" />
      </main>
    </PageWrapper>
  );
};

export default Home;
