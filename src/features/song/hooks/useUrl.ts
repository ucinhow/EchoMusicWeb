import { PlaySource } from "@src/common/typings";
import { get } from "@src/common/request";
import { isPlaySrc } from "@src/common/utils";
import { useEffect } from "react";
import { useRequest } from "@src/common/hooks";
const getUrl = (id: string, src: PlaySource) =>
  get<{ url: string }>("/song/url", { id, src });

const useUrl = (id?: string, src?: PlaySource) => {
  const { data, loading, run } = useRequest(getUrl, {
    manual: true,
  });
  useEffect(() => {
    if (id && isPlaySrc(src)) {
      run(id, src);
    }
  }, [id, src]);

  return { data: data?.url, loading };
};
export default useUrl;
