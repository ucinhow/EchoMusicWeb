import { Card } from "@src/common/components";
import { SonglistItem, Source } from "@src/common/typings";
import { useLocation } from "react-router-dom";
import { DetailMeta } from "./DetailMeta";
import { DetailList } from "./DetailList";
import { useDetail } from "./hooks";
export const Detail = () => {
  const { state } = useLocation();
  const item = state as SonglistItem & { src: Source };
  const { id, src } = item;
  const res = useDetail(id, src);
  const { data, loading } = res;
  return (
    <Card className="flex flex-col px-16 pt-16 space-y-16">
      <DetailMeta detail={data} loading={loading} />
      <DetailList data={res} />
    </Card>
  );
};
