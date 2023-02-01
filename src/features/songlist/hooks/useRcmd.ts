import { SOURCE } from "@src/common/constants";
import { get } from "@src/common/request";
import { SonglistItem } from "@src/common/typings";
import { useRequest } from "ahooks";

const getRcmd = async () => {
  const res: Array<SonglistItem> = [];
  for (const src of SOURCE) {
    res.push(
      ...(await get<Array<SonglistItem>>("/songlist/recommend", { src }))
    );
  }
  return res;
};

const useRcmd = () => {
  const { data, loading } = useRequest(getRcmd);
  return { data, loading };
};

export default useRcmd;
