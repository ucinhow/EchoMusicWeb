import PageWrapper from "./PageWrapper";
import { List, Menu } from "@src/features/songlist";
import { useContext, useState } from "react";
import { context } from "@src/common/components";
import { useTransferSrc } from "@src/features/common/hooks/useTransferSrc";
import { Source } from "@src/common/typings";

export const Songlist = () => {
  //   const { songlistSrc: src } = useContext(context);
  const [src, setSrc] = useState(Source.qq);
  const [id, setId] = useState("");
  useTransferSrc(src, setSrc);

  return (
    <PageWrapper>
      <main className="flex container space-x-5">
        <Menu src={src} id={id} setId={setId} />
        <List src={src} id={id} />
      </main>
    </PageWrapper>
  );
};

// export default Songlist;
