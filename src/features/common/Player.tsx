import { FC, useContext, useEffect, useRef, useState } from "react";
import { usePlayer, usePlay, Mode } from "./hooks";
import { composeClass } from "@src/common/utils";
import {
  PicSkeleton,
  TextSkeleton,
  PlayButton,
  PrevButton,
  NextButton,
  HideButton,
  PauseButton,
  ListButton,
  LockButton,
  ShuffleButton,
  LoopButton,
  TransferButton,
  Empty,
  context,
  useToast,
} from "@src/common/components";
import { SongItem } from "@src/common/typings";
import { Item } from "@src/features/song";
import useShowPlayer from "./hooks/useShowPlayer";

interface Props {
  className?: string;
}

// class constants
const buttonCls = "w-9 h-9";
const btnIconCls = "w-5 h-5";

const ModeButton: FC<{
  mode: Mode;
  className?: string;
  iconCls?: string;
  onClick?: VoidFunction;
}> = ({ mode, className, iconCls, onClick }) => {
  switch (mode) {
    case Mode.lock:
      return (
        <LockButton className={className} iconCls={iconCls} onClick={onClick} />
      );
    case Mode.random:
      return (
        <ShuffleButton
          className={className}
          iconCls={iconCls}
          onClick={onClick}
        />
      );
    default:
      return (
        <LoopButton className={className} iconCls={iconCls} onClick={onClick} />
      );
  }
};

const ListButtonContainer: FC<{ list: SongItem[] }> = ({ list }) => {
  const { play } = usePlay();
  const playList = (idx: number) => () => play(list, idx);
  const content = list.length ? (
    <ul className="w-full overflow-scroll max-h-[40rem] rounded-lg">
      {list.map((item, idx) => (
        <li key={idx}>
          <Item item={item} onPlayClick={playList(idx)} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="flex flex-col justify-center items-center w-full py-10">
      <Empty className="w-20 h-20" />
      暂无歌曲
    </div>
  );
  return (
    <ListButton
      className={buttonCls}
      iconCls={btnIconCls}
      withModalLabel
      modalContent={content}
    />
  );
};

const Player: FC<Props> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { detail, url, prev, next, transferSrc, playlist, transferMode, mode } =
    usePlayer(audioRef);
  const { picUrl, name, duration, singer } = detail || {};
  const audio = audioRef.current;
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(audio?.played || false);
  const [show, hide] = useShowPlayer();
  const play = () => {
    audio?.play();
  };
  const pause = () => {
    audio?.pause();
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const { showPlayer } = useContext(context);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, [showPlayer]);
  const toast = useToast();

  return (
    <div className="w-screen flex justify-center">
      {(showPlayer || animate) && (
        <div
          className={composeClass(
            "w-4/5 h-20 rounded-full flex flex-row items-center backdrop-blur-lg bg-base-100 px-5 py-3 justify-between space-x-10 shadow",
            showPlayer ? "animate__fadeIn" : "animate__fadeOut",
            animate ? "animate__animated" : "",
            "fixed bottom-2",
            className
          )}
          ref={containerRef}
          onAnimationEnd={({ animationName }) => {
            if (animationName === "slideOutRight") setAnimate(false);
          }}
        >
          <div className="flex items-center space-x-2 flex-1">
            {picUrl ? (
              <img src={picUrl} alt="" className="w-12 h-12 rounded-full" />
            ) : (
              <PicSkeleton
                className="w-12 h-12 rounded-full overflow-hidden"
                iconCls="w-8 h-8"
              />
            )}
            <div className="flex flex-col flex-1 justify-start text-xs space-y-1">
              {name ? (
                <span>{name}</span>
              ) : (
                <TextSkeleton className="w-20 h-4" />
              )}
              <progress
                className="progress progress-primary w-full"
                value={currentTime}
                max={duration || 100}
              ></progress>
              {singer ? (
                <span>{singer.map((s) => s.name).join(" | ")}</span>
              ) : (
                <TextSkeleton className="w-16 h-4" />
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="tooltip tooltip-primary" data-tip={"上一首"}>
              <PrevButton
                onClick={prev}
                className={buttonCls}
                iconCls={btnIconCls}
              />
            </div>
            {isPlaying ? (
              <div className="tooltip tooltip-primary" data-tip="暂停">
                <PauseButton
                  onClick={pause}
                  className={buttonCls}
                  iconCls={btnIconCls}
                />
              </div>
            ) : (
              <div className="tooltip tooltip-primary" data-tip="播放">
                <PlayButton
                  onClick={play}
                  className={buttonCls}
                  iconCls={btnIconCls}
                />
              </div>
            )}
            <div className="tooltip tooltip-primary" data-tip="下一首">
              <NextButton
                className={buttonCls}
                onClick={next}
                iconCls={btnIconCls}
              />
            </div>

            <div className="tooltip tooltip-primary" data-tip="切换顺序">
              <ModeButton
                mode={mode}
                className={buttonCls}
                iconCls={btnIconCls}
                onClick={transferMode}
              />
            </div>
            <div className="tooltip tooltip-primary" data-tip="播放列表">
              <ListButtonContainer list={playlist} />
            </div>

            <div className="tooltip tooltip-primary" data-tip="音源切换">
              <TransferButton
                className={buttonCls}
                iconCls={btnIconCls}
                onClick={transferSrc}
              />
            </div>

            <div className="tooltip tooltip-primary" data-tip="隐藏播放栏">
              <HideButton
                className={buttonCls}
                iconCls={btnIconCls}
                onClick={hide}
              />
            </div>
          </div>
        </div>
      )}
      <audio
        src={url}
        ref={audioRef}
        onTimeUpdate={() => {
          audio && setCurrentTime(audio.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={next}
        onError={() => {
          toast.error("当前音源播放错误，已自动换源");
          transferSrc();
        }}
      ></audio>
    </div>
  );
};

export default Player;
