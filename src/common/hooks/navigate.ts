import { useNavigate } from "react-router-dom";
import { LocationState as SongState } from "@src/features/song";
import { LocationState as SonglistState } from "@src/features/songlist/hooks";
import { LocationState as AlbumState } from "@src/features/album/hooks";
export const useToSonglistDetail = () => {
  const navigate = useNavigate();
  return (state: SonglistState) => {
    navigate("/songlist/detail", { state });
  };
};

export const useToAlbumDetail = () => {
  const navigate = useNavigate();
  return (state: AlbumState) => {
    navigate("/album/detail", { state });
  };
};

export const useToSongDetail = () => {
  const navigate = useNavigate();
  return (state: SongState) => {
    navigate("/song/detail", { state });
  };
};

export const useToSearch = () => {
  const navigate = useNavigate();
  return (key: string) => {
    navigate(`/search/${encodeURIComponent(key)}`);
  };
};
