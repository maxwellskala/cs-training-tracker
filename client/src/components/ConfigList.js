import React, { Component } from 'react';
import ConfigListItem from '../components/ConfigListItem';

class ConfigList extends Component {
  constructor(props) {
    super(props);

    this.renderConfigs = this.renderConfigs.bind(this);
  };

  renderConfigs() {
    const {
      configs,
      selectable,
      onSelectedConfigsChange,
      onOpenConfigsChange,
      selectedConfigs,
      openConfigs
    } = this.props;
    return configs.map((config) => {
      const configId = config.id;
      const open = openConfigs.includes(configId);
      const selected = selectedConfigs.includes(configId);
      return (
        <ConfigListItem
          key={configId}
          config={config}
          isOpen={open}
          isSelected={selected}
          selectable={selectable}
          onOpenChange={onOpenConfigsChange}
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
  openConfigs: React.PropTypes.array.isRequired,
  onSelectedConfigsChange: React.PropTypes.func.isRequired,
  onOpenConfigsChange: React.PropTypes.func.isRequired
};

export default ConfigList;
