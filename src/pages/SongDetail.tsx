import PageWrapper from "./PageWrapper";
import { Detail } from "@src/features/song";
export const SongDetail = () => {
  return (
    <PageWrapper>
      <main className="container">
        <Detail />
      </main>
    </PageWrapper>
  );
};
