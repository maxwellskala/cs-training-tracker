import React, { Component, createElement } from 'react';
import { withRoute } from 'react-router5';
import AimNav from '../components/AimNav';
import AddSession from '../components/AddSession';
import History from '../components/History';
import ViewConfigs from '../components/ViewConfigs';
import AddConfig from '../components/AddConfig';
import Loading from '../components/Loading';
import * as RouteNames from '../constants/RouteNames';

const COMPONENTS = {
  [RouteNames.AIM]: AddSession, // @TODO make this unnecessary, it sucks
  [RouteNames.AIM_ADD_SESSION]: AddSession,
  [RouteNames.AIM_HISTORY]: History,
  [RouteNames.AIM_VIEW_CONFIGS]: ViewConfigs,
  [RouteNames.AIM_ADD_CONFIG]: AddConfig
};

class AimContainer extends Component {
  componentDidMount() {
    this.props.fetchConfigs();
  };

  render() {
    const {
      route,
      router,
      configs,
      onLogout
    } = this.props;
    const body = configs === null
      ? Loading
      : COMPONENTS[route.name];
    const props = route.name === RouteNames.AIM_ADD_CONFIG
      ? {}
      : { configs };
    return (
      <div className='Aim'>
        <aside>
          <AimNav route={route} router={router} />
        </aside>
        <main>
          {createElement(body, props)}
          <button onClick={onLogout}>Log out</button>
        </main>
      </div>
    );
  };
};

AimContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired,
  fetchConfigs: React.PropTypes.func.isRequired,
  configs: React.PropTypes.array,
  route: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

export { AimContainer, COMPONENTS }; // for testing
export default withRoute(AimContainer);
