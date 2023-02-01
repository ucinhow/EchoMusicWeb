import Home from "./Home";
import Toplist from "./Toplist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Search";
import { Songlist } from "./Songlist";
import { SongDetail } from "./SongDetail";
import { SonglistDetail } from "./SonglistDetail";
import { AlbumDetail } from "./AlbumDetail";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/toplist", element: <Toplist /> },
  { path: "/songlist", element: <Songlist /> },
  { path: "/search/:key", element: <Search /> },
  { path: "/song/detail", element: <SongDetail /> },
  { path: "/songlist/detail", element: <SonglistDetail /> },
  { path: "/album/detail", element: <AlbumDetail /> },
]);

const Page = () => {
  return <RouterProvider router={router} />;
};

export default Page;
