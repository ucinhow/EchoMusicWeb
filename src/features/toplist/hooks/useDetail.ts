import { get } from "@src/common/request";
import { SongItem, Source } from "@src/common/typings";
import { usePagination, useRequest } from "ahooks";
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

export const useDetailPagination = (id: number = NaN, src: Source) => {
  const newGet = ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) =>
    getToplistDetail(id, current, pageSize, src).then(
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
    // refreshDeps: [src, id],
  });

  useEffect(() => {
    if (!Number.isNaN(id))
      run({ current: pagination.current, pageSize: pagination.pageSize });
  }, [id]);

  useEffect(() => {
    pagination.changeCurrent(1);
  }, [id, src]);

  return { data, loading, pagination, run };
};
