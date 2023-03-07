import { Carousel, PicSkeleton } from "@src/common/components";
import { get } from "@src/common/request";
import { useRequest } from "ahooks";
import { DataType, Source } from "@src/common/typings";
import { FC } from "react";
import { composeClass } from "@src/common/utils";
import Item from "./Item";
import {
  useToAlbumDetail,
  useToSonglistDetail,
} from "@src/common/hooks/navigate";

interface BannerResponse {
  banners: Array<{ type: DataType; id: string; picUrl: string; src: Source }>;
}

const useBanner = () => {
  const getBanner = () => get<BannerResponse>("/banner");
  const { data, loading } = useRequest(getBanner);
  return { data, loading };
};

const Banner: FC<{ className?: string }> = ({ className }) => {
  const { data, loading } = useBanner();
  const toSonglist = useToSonglistDetail();
  const toAlbum = useToAlbumDetail();
  return (
    <div className={composeClass("h-80 w-full", className)}>
      {data && !loading ? (
        <Carousel embedIndictor={true} auto>
          {(data.banners || []).map(({ picUrl, type, id, src }) => (
            <Item
              key={id}
              src={picUrl}
              className="h-80"
              onClick={() => {
                switch (type) {
                  case DataType.songlist:
                    toSonglist({ id, src });
                    return;
                  case DataType.album:
                    toAlbum({ [src]: { id } });
                }
              }}
            />
          ))}
        </Carousel>
      ) : (
        <PicSkeleton className="w-full h-80" />
      )}
    </div>
  );
};

export default Banner;
