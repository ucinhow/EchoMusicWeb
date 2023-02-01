import { FC, useState } from "react";
import Menu from "./Menu";
import List from "./List";
import { SetState, Source } from "@src/common/typings";
const Content: FC<{ src: Source }> = ({ src }) => {
  const [id, setId] = useState<number>();
  return (
    <main className="flex container space-x-5">
      <Menu setId={setId} id={id} src={src} />
      <List id={id} src={src} />
    </main>
  );
};

export default Content;
