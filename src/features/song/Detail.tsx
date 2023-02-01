import { Card } from "@src/common/components";
import { PLAYSOURCE } from "@src/common/constants";
import { SongItem } from "@src/common/typings";
import { useLocation } from "react-router-dom";
import { DetailData } from "./DetailData";
import { DetailLyric } from "./DetailLyric";

export const Detail = () => {
  const { state } = useLocation();
  const item = state as SongItem;
  const src = PLAYSOURCE.find((src) => item[src] !== undefined);
  const id = src ? item[src]?.id : undefined;
  return (
    <Card className="flex flex-col w-full p-16 space-y-16">
      <DetailData id={id} src={src} item={item} />
      <DetailLyric id={id} src={src} />
    </Card>
  );
};
