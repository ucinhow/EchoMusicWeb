import { SetState, Source } from "@src/common/typings";
import { FC, useEffect } from "react";
import { useMenu } from "./hooks";
import { Card, Spinner } from "@src/common/components";
export const Menu: FC<{ src: Source; id: string; setId: SetState<string> }> = ({
  src,
  id: currentId,
  setId,
}) => {
  const { data, loading } = useMenu(src, (res) => {
    const initId = res.group[0].item[0].id;
    setId(initId);
  });
  useEffect(() => {
    setId("");
  }, [src]);
  return (
    <Card className="flex flex-shrink-0 justify-center items-center h-screen w-64 sticky top-16">
      {data !== undefined && !loading ? (
        <ul className="menu bg-base-100 w-full p-2 rounded-lg overflow-scroll flex-nowrap">
          {data.group.map(({ name, item, id: groupId }) => (
            <>
              <li className="menu-title" key={groupId}>
                <span>{name}</span>
              </li>
              {item.map(({ name, id }) => (
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

// export default Menu;
