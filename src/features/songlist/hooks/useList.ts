import { usePagination } from "@src/common/hooks";
import { get } from "@src/common/request";
import { SonglistItem, Source } from "@src/common/typings";
import { useEffect } from "react";

interface ListResponse {
  list: Array<SonglistItem>;
  total: number;
}

const fetchList = (
  { current, pageSize }: { current: number; pageSize: number },
  src: Source,
  id: string
) =>
  get<ListResponse>("/songlist/list", {
    src,
    page: current,
    size: pageSize,
    id,
  }).then((res) => ({ list: res.list, total: res.total }));

export const useList = (src: Source, id: string) => {
  const res = usePagination(fetchList, {
    manual: true,
    defaultPageSize: 20,
  });
  const { run } = res;
  useEffect(() => {
    if (id === "") return;
    run({ current: 1, pageSize: 20 }, src, id);
  }, [id]);
  return res;
};
