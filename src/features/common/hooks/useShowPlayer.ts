import { useSetShowPlayer } from "@src/common/hooks/setContext";

const useShowPlayer = () => {
  const set = useSetShowPlayer();
  const show = () => set(true);
  const hide = () => set(false);
  return [show, hide];
};
export default useShowPlayer;
