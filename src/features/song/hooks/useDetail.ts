import { get } from "@src/common/request";
import { PlaySource } from "@src/common/typings";
import { isPlaySrc } from "@src/common/utils";
import { useEffect } from "react";
import { useRequest } from "@src/common/hooks";
interface DetailResponse {
  id: string;
  name: string;
  picUrl: string;
  singer: Array<{ name: string; id: string }>;
  publicTime: number;
  duration: number;
  album: {
    name: string;
    id: string;
  };
}

const getDetail = (id: string, src: PlaySource) => {
  return get<DetailResponse>("/song/detail", { id, src });
};

const useDetail = (id?: string, src?: string) => {
  const { data, loading, run } = useRequest(getDetail, {
    manual: true,
  });
  useEffect(() => {
    if (id === undefined || !isPlaySrc(src)) return; // todo: redirect to error page
    run(id, src);
  }, [id, src]);

  return { data, loading };
};
export default useDetail;
