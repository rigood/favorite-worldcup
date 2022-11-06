import { createBrowserRouter } from "react-router-dom";

import App from "./App.js";
import Home from "./pages/Home.js";
import Game from "./pages/Game.js";
import Winner from "./pages/Winner.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "result/:id",
        element: <Winner />,
      },
    ],
  },
]);

export default router;
