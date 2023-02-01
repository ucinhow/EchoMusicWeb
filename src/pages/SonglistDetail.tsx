import PageWrapper from "./PageWrapper";
import { Detail } from "@src/features/songlist";
export const SonglistDetail = () => {
  return (
    <PageWrapper>
      <main className="container">
        <Detail />
      </main>
    </PageWrapper>
  );
};
