import * as RouteNames from '../constants/RouteNames';

const routes = [
  { name: RouteNames.ROOT, path: '/' },
  { name: RouteNames.SIGNUP, path: '/signup' },
  { name: RouteNames.LOGIN, path: '/login' },

  { name: RouteNames.AIM, path: '/aim' },
  { name: RouteNames.AIM_ADD_SESSION, path: '/add-session' },
  { name: RouteNames.AIM_HISTORY, path: '/history' },
  { name: RouteNames.AIM_ADD_CONFIG, path: '/add-config' }
];

export default routes;
