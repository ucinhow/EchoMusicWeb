import { get } from "@src/common/request";
import { SongItem, Source } from "@src/common/typings";
import { usePagination, useRequest } from "@src/common/hooks";
import { useEffect } from "react";

interface ToplistDetailResponse {
  id: number;
  name: string;
  intro: string;
  updateTime: number;
  playCount: number;
  total: number;
  songlist: Array<SongItem>;
  picUrl: string;
}

const getToplistDetail = (
  id: number,
  page: number,
  size: number,
  src: Source
) => get<ToplistDetailResponse>("/toplist/detail", { id, page, size, src });

export const useDetail = (
  id: number,
  page: number,
  size: number,
  src: Source,
  manual: boolean = false
) => {
  const { data, loading, run } = useRequest(
    getToplistDetail,
    manual ? { manual: true } : { defaultParams: [id, page, size, src] }
  );
  return { data, loading, run: () => run(id, page, size, src) };
};

interface PaginationParams {
  current: number;
  pageSize: number;
}

export const useDetailPagination = (src: Source, id?: number) => {
  const newGet = ({ current, pageSize }: PaginationParams) =>
    getToplistDetail(id || NaN, current, pageSize, src).then(
      ({ id, name, songlist, updateTime, total, picUrl, intro }) => ({
        id,
        name,
        list: songlist,
        updateTime,
        total,
        picUrl,
        intro,
      })
    );
  const { data, loading, pagination, run } = usePagination(newGet, {
    manual: true,
    defaultPageSize: 20,
    // refreshDeps: [id, src],
  });

  useEffect(() => {
    if (id === undefined || src === undefined) return;
    run({ current: pagination.current, pageSize: pagination.pageSize });
  }, [id]);

  useEffect(() => {
    if (id === undefined || pagination.current === 1) return;
    pagination.changeCurrent(1);
  }, [id, src]);

  return { data, loading, pagination, run };
};
