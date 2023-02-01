import { useGroup, ToplistGroupResponse } from "./hooks";
import { FC, useContext } from "react";
import { context } from "@src/common/components";
import Spinner from "@src/common/components/Spinner";
import { Card } from "@src/common/components";
import { Source } from "@src/common/typings";

const Menu: FC<{ setId: (id: number) => void; id?: number; src: Source }> = ({
  setId,
  id: currentId,
  src,
}) => {
  // const { toplistSrc: src } = useContext(context);
  const onSuccess = (res: ToplistGroupResponse) => {
    setId(res.groups[0].toplist[0].id);
  };
  const { data, loading } = useGroup(src, onSuccess);
  return (
    <Card className="flex justify-center items-center h-screen w-72 sticky top-16">
      {data !== undefined && !loading ? (
        <ul className="menu bg-base-100 w-full p-2 rounded-lg overflow-scroll flex-nowrap">
          {data.groups.map(({ name, toplist }) => (
            <>
              <li className="menu-title" key={name}>
                <span>{name}</span>
              </li>
              {toplist.map(({ name, id }) => (
                <li className={currentId === id ? "text-primary" : ""} key={id}>
                  <a onClick={() => setId(id)}>{name}</a>
                </li>
              ))}
            </>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full flex justify-center items-center bg-base-200 rounded-lg">
          <Spinner />
        </div>
      )}
    </Card>
  );
};

export default Menu;
