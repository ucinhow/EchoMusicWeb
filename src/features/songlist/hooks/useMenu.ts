import { useRequest } from "@src/common/hooks";
import { get } from "@src/common/request";
import { Source } from "@src/common/typings";
import { useEffect } from "react";

export interface MenuResponse {
  group: Array<{
    id: string;
    name: string;
    item: Array<{ name: string; id: string }>;
  }>;
}

const fetchMenu = (src: Source) => {
  return get<MenuResponse>("/songlist/menu", { src });
};

export const useMenu = (
  src: Source,
  onSuccess?: (data: MenuResponse, params: [src: Source]) => void
) => {
  const { data, loading, run } = useRequest(fetchMenu, {
    onSuccess,
    manual: true,
  });
  useEffect(() => {
    run(src);
  }, [src]);
  return { data, loading };
};
