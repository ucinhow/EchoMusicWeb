import { FC, PropsWithChildren } from "react";
import { Header, Footer } from "@src/features";
import { Modal } from "@src/common/components";
import { useBackTop } from "@src/features/common/hooks";
const PageWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const containerRef = useBackTop();

  return (
    <div
      className="flex w-full flex-col items-center h-screen overflow-y-scroll"
      ref={containerRef}
    >
      <Header className="container" />
      {children}
      <Footer className="container mt-8" />
      <Modal />
    </div>
  );
};

export default PageWrapper;
