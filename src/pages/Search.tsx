import PageWrapper from "./PageWrapper";
import { Card } from "@src/common/components";
import {
  SearchBar,
  SongResult,
  TypeNav,
  AlbumResult,
  SonglistResult,
} from "@src/features";
import { useState } from "react";
import { SearchType } from "@src/common/typings";
import { useParams } from "react-router-dom";
const Search = () => {
  const { key } = useParams();
  const [searchType, setSearchType] = useState(SearchType.song);
  return (
    <PageWrapper>
      <main className="container flex flex-col">
        <SearchBar value={key} />
        <Card className="flex flex-col space-y-5">
          <TypeNav searchType={searchType} setSearchType={setSearchType} />
          {searchType === SearchType.song && <SongResult keyword={key || ""} />}
          {searchType === SearchType.album && (
            <AlbumResult keyword={key || ""} />
          )}
          {searchType === SearchType.songlist && (
            <SonglistResult keyword={key || ""} />
          )}
        </Card>
      </main>
    </PageWrapper>
  );
};

export default Search;
