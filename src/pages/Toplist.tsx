import { Source } from "@src/common/typings";
import { Content } from "@src/features";
import { useTransferSrc } from "@src/features/common/hooks/useTransferSrc";
import { useState } from "react";
import PageWrapper from "./PageWrapper";
const Toplist = () => {
  const [src, setSrc] = useState(Source.qq);
  useTransferSrc(src, setSrc);

  return (
    <PageWrapper>
      <Content src={src} />
    </PageWrapper>
  );
};

export default Toplist;
