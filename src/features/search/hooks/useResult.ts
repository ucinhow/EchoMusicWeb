import { get } from "@src/common/request";
import {
  SongItem,
  SonglistItem,
  AlbumItem,
  SearchType,
} from "@src/common/typings";
import { usePagination } from "@src/common/hooks";

interface SearchSongResponse {
  hasMore: boolean;
  data: Array<SongItem>;
  type: SearchType;
}
interface SearchAlbumResponse {
  hasMore: boolean;
  data: Array<AlbumItem>;
  type: SearchType;
}
interface SearchSonglistResponse {
  hasMore: boolean;
  data: Array<SonglistItem>;
  type: SearchType;
}

// const search =
//   (type: SearchType) =>

const SIZE = 20;
const searchSong = (key: string, page: number, size: number) =>
  get<SearchSongResponse>("/search/type", {
    key,
    page,
    size,
    type: SearchType.song,
  });
const searchAlbum = (key: string, page: number, size: number) =>
  get<SearchAlbumResponse>("/search/type", {
    key,
    page,
    size,
    type: SearchType.album,
  });
const searchSonglist = (key: string, page: number, size: number) =>
  get<SearchSonglistResponse>("/search/type", {
    key,
    page,
    size,
    type: SearchType.songlist,
  });

type serviceParams = { current: number; pageSize: number };

export const useSongResult = (key: string) => {
  const service = ({ current, pageSize }: serviceParams) =>
    searchSong(key, current, pageSize).then((res) => {
      const fakeTotal =
        (current - 1) * pageSize +
        res.data.length +
        (res.hasMore ? pageSize : 0);
      return {
        list: res.data,
        total: fakeTotal,
      };
    });
  return usePagination(service, {
    defaultPageSize: SIZE,
    refreshDeps: [key],
  });
};

export const useAlbumResult = (key: string) => {
  const service = ({ current, pageSize }: serviceParams) =>
    searchAlbum(key, current, pageSize).then((res) => {
      const fakeTotal =
        (current - 1) * pageSize +
        res.data.length +
        (res.hasMore ? pageSize : 0);
      return {
        list: res.data,
        total: fakeTotal,
      };
    });
  return usePagination(service, {
    defaultPageSize: SIZE,
    refreshDeps: [key],
  });
};

export const useSonglistResult = (key: string) => {
  const service = ({ current, pageSize }: serviceParams) =>
    searchSonglist(key, current, pageSize).then((res) => {
      const fakeTotal =
        (current - 1) * pageSize +
        res.data.length +
        (res.hasMore ? pageSize : 0);
      return {
        list: res.data,
        total: fakeTotal,
      };
    });
  return usePagination(service, {
    defaultPageSize: SIZE,
    refreshDeps: [key],
  });
};
