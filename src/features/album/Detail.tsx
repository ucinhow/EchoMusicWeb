import { Card } from "@src/common/components";
import { AlbumItem } from "@src/common/typings";
import { useLocation } from "react-router-dom";
import { DetailMeta } from "./DetailMeta";
import { DetailList } from "./DetailList";
import { useDetail } from "./hooks";
import { SOURCE } from "@src/common/constants";
export const Detail = () => {
  const { state } = useLocation();
  const item = state as AlbumItem;
  const src = SOURCE.find((src) => item[src] !== undefined);
  const id = src ? item[src]?.id : undefined;
  const res = useDetail(id, src);
  const { data, loading } = res;
  return (
    <Card className="flex flex-col px-16 pt-16 space-y-16">
      <DetailMeta data={data} loading={loading} />
      <DetailList data={data} loading={loading} />
    </Card>
  );
};
