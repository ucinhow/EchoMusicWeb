import { Source, PlaySource } from "../typings";
import { PLAYSOURCE, SOURCE } from "../constants";

export const isSrc = (str?: string): str is Source =>
  Boolean(str && ~SOURCE.findIndex((src) => src === str));

export const isPlaySrc = (str?: string): str is PlaySource =>
  Boolean(str && ~PLAYSOURCE.findIndex((src) => src === str));
