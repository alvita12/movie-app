import Authentication from "../features/auth";
import Detail from "../features/detail";
import Layout from "../components/layout";
import MovieDetail from "../components/movie-detail";
import Movies from "../features/movies";
import ProtectedRoutes from "./protected-routes";
import TVShows from "../features/tv-shows";
import Trending from "../features/trending";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: "/login",
            element: <Authentication />,
          },
          {
            path: "/detail",
            element: <Detail />,
          },
          {
            path: "/movies/:id",
            element: <MovieDetail />,
          },
          {
            path: "/tv-shows",
            element: <TVShows />,
          },
          {
            path: "/tv-shows/:id",
            element: <MovieDetail />,
          },
          {
            path: "/trending",
            element: <Trending />,
          },
          {
            path: "/trending/:id",
            element: <MovieDetail />,
          },
        ],
      },
    ],
  },
]);
