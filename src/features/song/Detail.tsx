import { Card } from "@src/common/components";
import { useLocation } from "./hooks";
import { DetailData } from "./DetailData";
import { DetailLyric } from "./DetailLyric";

export const Detail = () => {
  const { item, id, src } = useLocation();
  return (
    <Card className="flex flex-col w-full p-16 space-y-16">
      <DetailData id={id} src={src} item={item} />
      <DetailLyric id={id} src={src} />
    </Card>
  );
};
