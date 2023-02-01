import { usePagination, useRequest } from "@src/common/hooks";
import { get } from "@src/common/request";
import { Source } from "@src/common/typings";
import { SongItem } from "@src/common/typings";
import { useEffect } from "react";
interface DetailResponse {
  id: string;
  name: string;
  picUrl: string;
  playCount?: number;
  desc: string;
  total: number;
  songlist: Array<SongItem>;
  createTime?: number;
}

export type Data = DetailResponse & { list: SongItem[] };

const fetchDetail = (
  {
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  },
  id: string,
  src: Source
) =>
  get<DetailResponse>("/songlist/detail", {
    page: current,
    src,
    size: pageSize,
    id,
  }).then((res) => ({ ...res, list: res.songlist }));

export const useDetail = (id: string, src: Source) => {
  const res = usePagination(fetchDetail, {
    defaultPageSize: 20,
    defaultParams: [{ current: 1, pageSize: 20 }, id, src],
  });
  //   const { run } = res;
  //   useEffect(() => {}, []);
  return res;
};

export type Result = ReturnType<typeof useDetail>;
