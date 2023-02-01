import { usePagination, useRequest } from "@src/common/hooks";
import { get } from "@src/common/request";
import { Source } from "@src/common/typings";
import { SongItem } from "@src/common/typings";
import { useEffect } from "react";
export interface DetailResponse {
  id: string;
  name: string;
  picUrl: string;
  publicTime: number;
  desc: string;
  singer: Array<{ id: string; name: string }>;
  songlist: Array<SongItem>;
}

const fetchDetail = (id: string, src: Source) =>
  get<DetailResponse>("/album/detail", { id, src });

// export type Data = DetailResponse & { list: SongItem[] };

// const fetchDetail = (
//   {
//     current,
//     pageSize,
//   }: {
//     current: number;
//     pageSize: number;
//   },
//   id: string,
//   src: Source
// ) =>
//   get<DetailResponse>("/songlist/detail", {
//     page: current,
//     src,
//     size: pageSize,
//     id,
//   }).then((res) => ({ ...res, list: res.songlist }));

// export const useDetail = (id: string, src: Source) => {
//   const res = usePagination(fetchDetail, {
//     defaultPageSize: 20,
//     defaultParams: [{ current: 1, pageSize: 20 }, id, src],
//   });
//   //   const { run } = res;
//   //   useEffect(() => {}, []);
//   return res;
// };

// export type Result = ReturnType<typeof useDetail>;

export const useDetail = (id: string | undefined, src: Source | undefined) => {
  const { data, loading, run } = useRequest(fetchDetail, {
    // defaultParams: [id, src],
    manual: true,
  });
  useEffect(() => {
    if (id === undefined || src === undefined) return; // todo: redirect to error page
    run(id, src);
  }, [src, id]);
  return { data, loading };
};
