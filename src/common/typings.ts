import { Dispatch, SetStateAction } from "react";
import { useSetState } from "ahooks";
export type SetState<T> = Dispatch<SetStateAction<T>>;
export enum DataType {
  songlist = 1,
  album = 2,
  song = 3,
  singer = 4,
  toplist = 5,
  mv = 6,
  // user = 7,
}

export type SongItem = {
  name: string;
  singerName: Array<string>;
  albumName: string;
  duration: number; // seconds
} & PlaySrcMeta<{
  id: string;
  singerId: Array<string>;
  albumId: string;
  playable: boolean;
}>;

export interface SonglistItem {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
  src: Source;
}

export type AlbumItem = SrcMeta<{
  id: string;
  picUrl: string;
  singerId: Array<string>;
}> & {
  name: string;
  publicTime: number;
  singerName: Array<string>;
};

export enum PlaySource {
  qq = "qq",
  joox = "joox",
  kw = "kw",
}

export enum Source {
  qq = "qq",
  kw = "kw",
}

export type SrcMeta<T> = {
  [K in keyof typeof Source]?: T;
};

export type PlaySrcMeta<T> = {
  [K in keyof typeof PlaySource]?: T;
};

// export type VoidFunction = (...args: any[]) => void;
export enum AsideBtnKey {
  backTop = "backTop",
  transferSrc = "transferSrc",
  showPlayer = "showPlayer",
}

export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
}

export type SetAhookState<T extends Record<string, any>> = ReturnType<
  typeof useSetState<T>
>[1];
