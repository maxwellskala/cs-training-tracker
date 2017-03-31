import React, { Component } from 'react';
import ConfigListItem from '../components/ConfigListItem';

class ConfigList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openConfig: null,
      selectedConfigs: []
    };

    this.renderConfigs = this.renderConfigs.bind(this);
    this.handleConfigOpenChange = this.handleConfigOpenChange.bind(this);
    this.handleConfigSelectChange = this.handleConfigSelectChange.bind(this);
  };

  handleConfigOpenChange(configId) {
    this.setState((prevState) => {
      if (prevState.openConfig === configId) {
        return { openConfig: null };
      }
      return { openConfig: configId };
    });
  };

  handleConfigSelectChange(configId) {
    this.setState((prevState) => {
      const prevSelectedConfigs = prevState.selectedConfigs;
      if (prevSelectedConfigs.includes(configId)) {
        const newSelectedConfigs = prevSelectedConfigs.filter((id) => {
          return id !== configId;
        });
        return { selectedConfigs: newSelectedConfigs };
      }
      return { selectedConfigs: prevSelectedConfigs.concat([configId]) };
    });
  };

  renderConfigs() {
    const { openConfig, selectedConfigs } = this.state;
    return this.props.configs.map((config) => {
      const configId = config.id;
      const open = configId === openConfig;
      const selected = selectedConfigs.includes(configId);
      return (
        <ConfigListItem
          key={configId}
          config={config}
          isOpen={open}
          isSelected={selected}
          selectable={this.props.selectable}
          onOpenChange={this.handleConfigOpenChange}
          onSelectChange={this.handleConfigSelectChange}
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
  selectable: React.PropTypes.bool.isRequired
};

export default ConfigList;
