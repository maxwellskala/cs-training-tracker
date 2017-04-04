import React, { Component } from 'react';
import { Link } from 'react-router5';
import ConfigList from '../components/ConfigList';
import { updateConfigState } from '../utils/stateReducers';
import * as RouteNames from '../constants/RouteNames';

class ViewConfigs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfigs: []
    };

    this.handleConfigOpenChange = this.handleConfigOpenChange.bind(this);
  };

  handleConfigOpenChange(configId) {
    this.setState(
      updateConfigState('openConfigs', configId)
    );
  };

  render() {
    const { configs } = this.props;
    const { openConfigs } = this.state;
    return (
      <div className='ViewConfigs'>
        <ConfigList
          configs={configs}
          selectable={false}
          openConfigs={openConfigs}
          onOpenConfigsChange={this.handleConfigOpenChange}
        />
        <Link routeName={RouteNames.AIM_ADD_CONFIG}>
          <button>Add config</button>
        </Link>
      </div>
    );
  };
};

ViewConfigs.propTypes = {
  configs: React.PropTypes.array.isRequired
};

export default ViewConfigs;
