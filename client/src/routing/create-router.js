import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import * as RouteNames from '../constants/RouteNames';
import routes from './routes';

const options = {
  defaultRoute: RouteNames.ROOT,
  trailingSlash: true
};

function configureRouter() {
  return createRouter(routes, options)
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin())
    .usePlugin(listenersPlugin());
};

export default configureRouter;
