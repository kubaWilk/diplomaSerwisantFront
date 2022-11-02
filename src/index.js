import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './components/ErrorPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import StartPage from './components/layout/StartPage';
import Repairs from './components/Repairs';
import Customers from './components/Customers';
import Statistics from './components/Statistics'
import Users from './components/Users'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children : [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "/repairs",
        element: <Repairs />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/stats",
        element: <Statistics />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
