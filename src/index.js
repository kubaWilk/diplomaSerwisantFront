import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from './components/pages/ErrorPage'
import StartPage from './components/pages/startPage/StartPage';
import Repairs from './components/pages/repairs/Repairs';
import NewRepair from './components/pages/repairs/NewRepair';
import Customers from './components/pages/Customers';
import Statistics from './components/pages/Statistics'
import Users from './components/pages/Users'

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
        children : [
          {
            path: "/repairs/add",
            element: <NewRepair />
          },
          {
            path: "/repairs/all",
            element: <Repairs />
          }
        ]
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
