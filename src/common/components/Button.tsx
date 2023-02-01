import { createIconButton } from "./createIconButton";
import {
  BiRightArrowAlt,
  BiPlay,
  BiSkipNext,
  BiSkipPrevious,
  BiLeftArrowAlt,
  BiPause,
  BiListUl,
  BiChevronRight,
  BiShuffle,
  BiRefresh,
  BiLockAlt,
  BiRepost,
  BiTransferAlt,
  BiArrowToTop,
  BiShowAlt,
  BiHide,
} from "react-icons/bi";
export const PlayButton = createIconButton(BiPlay);
export const PauseButton = createIconButton(BiPause);
export const PrevButton = createIconButton(BiSkipPrevious);
export const NextButton = createIconButton(BiSkipNext);
export const ToRightButton = createIconButton(BiRightArrowAlt);
export const ToLeftButton = createIconButton(BiLeftArrowAlt);
export const RightButton = createIconButton(BiChevronRight);
export const ListButton = createIconButton(BiListUl);
export const ShuffleButton = createIconButton(BiShuffle);
export const LockButton = createIconButton(BiLockAlt);
export const LoopButton = createIconButton(BiRepost);
export const TransferButton = createIconButton(BiTransferAlt);
export const BackTopButton = createIconButton(BiArrowToTop);
export const ShowButton = createIconButton(BiShowAlt);
export const HideButton = createIconButton(BiHide);
