import { useSetToTop } from "@src/common/hooks/setContext";
import { AsideBtnKey } from "@src/common/typings";
import { useScroll } from "ahooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAsideBtn } from "./useAsideBtn";

const useBackTop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [add, remove] = useAsideBtn();
  const position = useScroll(
    containerRef,
    ({ top }) => (top === 0 && show) || (top > 0 && !show)
  );
  const { top } = position || {};

  const setToTop = useSetToTop();
  const toTop = useCallback(() => {
    const fn = () => {
      if (!containerRef.current) return;
      const currentTop = containerRef.current.scrollTop;
      if (currentTop === 0) return;
      window.requestAnimationFrame(fn);
      containerRef.current.scrollTop = currentTop - currentTop / 8;
    };
    fn();
  }, []);

  useEffect(() => {
    if (top === undefined) return;
    if (top > 0) {
      add(AsideBtnKey.backTop);
      setShow(true);
    }
    return () => {
      remove(AsideBtnKey.backTop);
      setShow(false);
    };
  }, [top]);

  useEffect(() => {
    setToTop(toTop);
    return () => setToTop(() => {});
  }, []);
  return containerRef;
};
export default useBackTop;
