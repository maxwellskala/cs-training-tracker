import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import routes from './routes';

function configureRouter() {
  return createRouter(routes)
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin)
    .usePlugin(listenersPlugin);
};

export default configureRouter;
