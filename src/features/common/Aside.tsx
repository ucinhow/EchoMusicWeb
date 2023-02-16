import {
  TransferButton,
  BackTopButton,
  context,
  ShowButton,
} from "@src/common/components";
import { composeClass } from "@src/common/utils";
import { FC } from "react";
import { AsideBtnKey } from "@src/common/typings";
import useToTop from "./hooks/useToTop";
import useShowPlayer from "./hooks/useShowPlayer";
import { useContextSelector } from "use-context-selector";
const buttonKeys = Object.values(AsideBtnKey);

const cls = "w-10 h-10 animate__zoomIn";
const iconCls = "w-5 h-5";

const Aside: FC<{ className?: string }> = ({ className }) => {
  // const store = useContext(context);
  // const { asideButtons, transSrc, showPlayer } = store;
  const { asideButtons, transSrc, showPlayer } = useContextSelector(
    context,
    ({ store: { asideButtons, transSrc, showPlayer } }) => ({
      asideButtons,
      transSrc,
      showPlayer,
    })
  );
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
                <li
                  key={key}
                  className="tooltip tooltip-primary tooltip-left"
                  data-tip={"返回顶部"}
                >
                  <BackTopButton
                    className={cls}
                    iconCls={iconCls}
                    onClick={toTop}
                  />
                </li>
              );
            case AsideBtnKey.showPlayer:
              return !showPlayer ? (
                <li
                  key={key}
                  className="tooltip tooltip-primary tooltip-left"
                  data-tip={"显示播放栏"}
                >
                  <ShowButton
                    className={cls}
                    iconCls={iconCls}
                    onClick={show}
                  />
                </li>
              ) : null;

            default:
              return (
                <li
                  key={key}
                  className="tooltip tooltip-primary tooltip-left"
                  data-tip={"切换页面音源"}
                >
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
