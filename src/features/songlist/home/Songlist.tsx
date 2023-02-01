import { composeClass } from "@src/common/utils";
import { FC } from "react";
import { Card, Carousel } from "@src/common/components";
import { SonglistItem } from "@src/common/typings";
// import Item, { Skeleton } from "./Item";
import { Item, Skeleton } from "@src/features/songlist";
import { useRcmd } from "../hooks";
interface Props {
  className?: string;
}

const splitSonglistArr = (arr: SonglistItem[], num: number) => {
  let start = 0;
  const res: SonglistItem[][] = [];
  while (start < arr.length) {
    res.push(arr.slice(start, start + num));
    start += num;
  }
  return res;
};

const HomeSonglist: FC<Props> = ({ className }) => {
  const { data, loading } = useRcmd();
  return (
    <section className={composeClass(className)}>
      <header className="text-2xl font-bold font-mono mb-2">推荐歌单</header>
      <Card>
        {data === undefined || loading ? (
          <ul className="flex space-x-5">
            {new Array(5).fill(1).map((_, idx) => (
              <li className="flex-1" key={idx}>
                <Skeleton />
              </li>
            ))}
          </ul>
        ) : (
          <Carousel>
            {splitSonglistArr(data, 5).map((items, idx) => (
              <ul className="flex space-x-5" key={idx}>
                {items.map((item) => (
                  <li key={item.id}>
                    <Item item={item} className="w-full" key={item.id} />
                  </li>
                ))}
              </ul>
            ))}
          </Carousel>
        )}
      </Card>
    </section>
  );
};

export default HomeSonglist;
