import React, { Component } from 'react';
import ConfigListItem from '../components/ConfigListItem';

class ConfigList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfig: null,
    };

    this.renderConfigs = this.renderConfigs.bind(this);
    this.handleConfigOpenChange = this.handleConfigOpenChange.bind(this);
  };

  handleConfigOpenChange(configId) {
    this.setState((prevState) => {
      if (prevState.openConfig === configId) {
        return { openConfig: null };
      }
      return { openConfig: configId };
    });
  };

  renderConfigs() {
    const {
      configs,
      selectable,
      onSelectedConfigsChange,
      selectedConfigs
    } = this.props;
    const { openConfig } = this.state;
    return configs.map((config) => {
      const configId = config.id;
      const open = configId === openConfig;
      const selected = selectedConfigs.includes(configId);
      return (
        <ConfigListItem
          key={configId}
          config={config}
          isOpen={open}
          isSelected={selected}
          selectable={selectable}
          onOpenChange={this.handleConfigOpenChange}
          onSelectChange={onSelectedConfigsChange}
        />
      );
    });
  }

  render() {
    return (
      <div className='ConfigList'>
        <h3>Configs</h3>
        <ul>
          {this.renderConfigs()}
        </ul>
      </div>
    );
  };
};

ConfigList.propTypes = {
  configs: React.PropTypes.array.isRequired,
  selectable: React.PropTypes.bool.isRequired,
  selectedConfigs: React.PropTypes.array.isRequired,
  onSelectedConfigsChange: React.PropTypes.func.isRequired
};

export default ConfigList;
