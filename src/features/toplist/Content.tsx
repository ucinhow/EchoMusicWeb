import { FC, useState } from "react";
import Menu from "./Menu";
import List from "./List";
import { Source } from "@src/common/typings";
import { useTransferSrc } from "../common/hooks/useTransferSrc";
const Content: FC = () => {
  const [id, setId] = useState<number>();
  const [src, setSrc] = useState(Source.qq);
  useTransferSrc(src, setSrc, () => setId(undefined));
  return (
    <main className="flex container space-x-5">
      <Menu setId={setId} id={id} src={src} />
      <List id={id} src={src} />
    </main>
  );
};

export default Content;
