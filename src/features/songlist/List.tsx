import { Card } from "@src/common/components";
import { Item, Skeleton } from "./Item";
import { composeClass } from "@src/common/utils";
import { useList } from "./hooks";
import { FC } from "react";
import { Source } from "@src/common/typings";
export const List: FC<{ className?: string; src: Source; id: string }> = ({
  className,
  src,
  id,
}) => {
  const { data, loading, pagination } = useList(src, id);
  const { current, changeCurrent, totalPage } = pagination;
  return (
    <Card
      className={composeClass("flex-1 flex flex-col items-center", className)}
    >
      <ul className="grid grid-cols-4 gap-5 w-full">
        {data && !loading
          ? data.list.map((item, idx) => (
              <li key={idx}>
                <Item item={item} className="w-auto" />
              </li>
            ))
          : new Array(20).fill(1).map((_, idx) => <Skeleton key={idx} />)}
      </ul>
      <div className="btn-group mt-5">
        <button
          className="btn"
          onClick={() => changeCurrent(current - 1)}
          disabled={current === 1}
        >
          «
        </button>
        <button className="btn">Page {current}</button>
        <button
          className="btn"
          onClick={() => changeCurrent(current + 1)}
          disabled={current === totalPage}
        >
          »
        </button>
      </div>
    </Card>
  );
};
