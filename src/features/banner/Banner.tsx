import { Carousel, PicSkeleton } from "@src/common/components";
import { get } from "@src/common/request";
import { useRequest } from "ahooks";
import { DataType } from "@src/common/typings";
import { FC } from "react";
import { composeClass } from "@src/common/utils";
import Item from "./Item";

interface BannerResponse {
  banners: Array<{ type: DataType; id: string; picUrl: string }>;
}

const useBanner = () => {
  const getBanner = () => get<BannerResponse>("/banner");
  const { data, loading } = useRequest(getBanner);
  return { data, loading };
};

const Banner: FC<{ className?: string }> = ({ className }) => {
  const { data, loading } = useBanner();
  return (
    <div className={composeClass("h-80 w-full", className)}>
      {data && !loading ? (
        <Carousel embedIndictor={true}>
          {(data.banners || []).map(({ picUrl }, idx) => (
            <Item key={idx} src={picUrl} className="h-80" />
          ))}
        </Carousel>
      ) : (
        <PicSkeleton className="w-full h-80" />
      )}
    </div>
  );
};

export default Banner;
