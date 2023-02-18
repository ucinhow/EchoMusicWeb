import { Card } from "@src/common/components";
import { DetailMeta } from "./DetailMeta";
import { DetailList } from "./DetailList";
import { useDetail, useLocation } from "./hooks";
export const Detail = () => {
  const { id, src } = useLocation();
  const res = useDetail(id, src);
  const { data, loading } = res;
  return (
    <Card className="flex flex-col px-16 pt-16 space-y-16">
      <DetailMeta detail={data} loading={loading} />
      <DetailList data={res} />
    </Card>
  );
};
