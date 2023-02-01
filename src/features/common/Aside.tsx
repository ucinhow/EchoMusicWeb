import {
  TransferButton,
  BackTopButton,
  context,
  // ToLeftButton,
  ShowButton,
} from "@src/common/components";
import { composeClass } from "@src/common/utils";
import { FC, useCallback, useContext } from "react";
import { AsideBtnKey, Source } from "@src/common/typings";
import { SOURCE } from "@src/common/constants";
import useToTop from "./hooks/useToTop";
import useShowPlayer from "./hooks/useShowPlayer";

const buttonKeys = Object.values(AsideBtnKey);

const cls = "w-10 h-10 animate__zoomIn";
const iconCls = "w-5 h-5";

const Aside: FC<{ className?: string }> = ({ className }) => {
  const store = useContext(context);
  const { asideButtons, transSrc, showPlayer } = store;
  // const src = transSrcKey === "toplist" ? store.toplistSrc : store.songlistSrc;
  // const transferSrc = useCallback(() => {
  //   const index = SOURCE.indexOf(src);
  //   const newSrc = SOURCE[(index + 1) % SOURCE.length];
  //   if (transSrcKey === "toplist") setStore?.({ toplistSrc: newSrc });
  //   if (transSrcKey === "songlist") setStore?.({ songlistSrc: newSrc });
  // }, [setStore, src, transSrcKey]);
  const toTop = useToTop();
  const [show] = useShowPlayer();
  return (
    <aside className={composeClass("fixed right-8 bottom-1/3 w-10", className)}>
      <ul className="flex flex-col space-y-5">
        {buttonKeys.map((key) => {
          if (!asideButtons[key]) return null;
          switch (key) {
            case AsideBtnKey.backTop:
              return (
                <li key={key}>
                  <BackTopButton
                    className={cls}
                    iconCls={iconCls}
                    onClick={toTop}
                  />
                </li>
              );
            case AsideBtnKey.showPlayer:
              return !showPlayer ? (
                <li key={key}>
                  <ShowButton
                    className={cls}
                    iconCls={iconCls}
                    onClick={show}
                  />
                </li>
              ) : null;

            default:
              return (
                <li key={key}>
                  <TransferButton
                    className={cls}
                    iconCls={iconCls}
                    onClick={transSrc}
                  />
                </li>
              );
          }
        })}
      </ul>
    </aside>
  );
};

export default Aside;
