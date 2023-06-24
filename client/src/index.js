import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import './index.css';
import App from './App';
import scrollToTop from './scrollToTop';
import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/top-artists",
    element: <div>top artists</div>,
  },
  {
    path: "/top-tracks",
    element: <div>top tracks</div>,
  },
  {
    path: "/playlists/:id",
    element: <div>top playlists </div>,
  },
  {
    path: "/playlists",
    element: <h1>Playlists</h1>,
  }
]);


const domNode = document.getElementById('root');

const root = createRoot(domNode);
root.render(<RouterProvider router={router} />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

reportWebVitals();
