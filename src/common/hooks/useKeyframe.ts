import { useEffect, useState, RefObject, useCallback } from "react";

enum AnimateState {
  in = "in",
  out = "out",
  none = "none",
}

const useKeyframe = (
  mounted: boolean,
  ref: RefObject<HTMLElement>,
  keyframe: string
): [string, boolean] => {
  const [state, setState] = useState(AnimateState.none);
  const [shouldMount, setShouldMount] = useState(mounted);
  const className = keyframe2ClassName(keyframe, state);
  const onAnimationEnd = useCallback(() => {
    if (state === AnimateState.out) setShouldMount(false);
  }, [state]);
  useEffect(() => {
    if (ref.current === null) return;
    ref.current.onanimationend = onAnimationEnd;
  }, [ref.current, onAnimationEnd]);
  useEffect(() => {
    if (mounted) {
      // mount the component then display animation as a callback
      const mountAndDisplay = () => {
        setShouldMount(true);
        setState(AnimateState.in);
      };
      // if it is running out animation, interrupt it, then run the callback above in next Macro Task
      if (state === AnimateState.out) {
        setState(AnimateState.none);
        setShouldMount(false);
        setTimeout(mountAndDisplay, 0);
        return;
      }
      // if not, run the callback
      mountAndDisplay();
    } else {
      console.log("unmount");
      // display the animation then unmount the component in onanimationend
      setState(AnimateState.out);
    }
  }, [mounted]);
  return [className, shouldMount];
};

// animate__slow	2s
// animate__slower	3s
// animate__fast	800ms
// animate__faster	500ms
function keyframe2ClassName(
  keyframe: string,
  state: AnimateState,
  speed: "slow" | "slower" | "fast" | "faster" = "faster"
) {
  switch (state) {
    case AnimateState.in:
      return `animate__${keyframe}In animate__animated animate__${speed}`;
    case AnimateState.out:
      return `animate__${keyframe}Out animate__animated animate__${speed}`;
    default:
      return "";
  }
}

export const useFadeAnimation = (
  show: boolean,
  ref: RefObject<HTMLElement>
) => {
  return useKeyframe(show, ref, "fade");
};

export const useZoomAnimation = (
  show: boolean,
  ref: RefObject<HTMLElement>
) => {
  return useKeyframe(show, ref, "zoom");
};
