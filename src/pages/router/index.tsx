import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/home';
import Publish from '@pages/publish';
import Receive from '@pages/receive';
import CreateProject from '../create-project';
import Detail from '../detail';
import Layout from '@/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/create', element: <CreateProject /> },
      { path: '/publish', element: <Publish /> },
      { path: '/receive', element: <Receive /> },
      { path: '/detail', element: <Detail /> },
    ],
  },
]);

export default router;
