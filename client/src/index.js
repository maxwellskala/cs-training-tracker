import ReactDOM from 'react-dom';
import createRouter from './routing/create-router';
import routeApp from './routing/route-app';
import './index.css';

const router = createRouter();
const routedApp = routeApp(router);

router.start(() => {
  ReactDOM.render(
    routedApp,
    document.getElementById('root')
  );
});
