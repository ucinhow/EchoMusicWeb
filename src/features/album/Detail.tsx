import { Card } from "@src/common/components";
import { DetailMeta } from "./DetailMeta";
import { DetailList } from "./DetailList";
import { useDetail, useLocation } from "./hooks";
export const Detail = () => {
  const { src, id } = useLocation();
  const res = useDetail(id, src);
  const { data, loading } = res;
  return (
    <Card className="flex flex-col px-16 pt-16 space-y-16">
      <DetailMeta data={data} loading={loading} />
      <DetailList data={data} loading={loading} />
    </Card>
  );
};
