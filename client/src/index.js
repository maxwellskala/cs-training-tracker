import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { RouterProvider } from 'react-router5';
import createRouter from './routing/create-router';
import './index.css';

const router = createRouter();
const app = <RouterProvider router={router}><App /></RouterProvider>;

router.start(() => {
  ReactDOM.render(
    app,
    document.getElementById('root')
  );
});
