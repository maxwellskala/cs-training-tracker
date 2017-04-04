import React from 'react';
import ConfigListItem from '../components/ConfigListItem';

const ConfigList = ({
  configs,
  selectable,
  selectedConfigs,
  openConfigs,
  onSelectedConfigsChange,
  onOpenConfigsChange
}) => {
  const body = configs.map((config) => {
    const configId = config.id;
    const open = openConfigs.includes(configId);
    const selected = selectable && selectedConfigs.includes(configId);
    const props = {
      key: configId,
      config,
      isOpen: open,
      isSelected: selected,
      selectable,
      onOpenChange: onOpenConfigsChange
    };
    if (selectable && onSelectedConfigsChange) {
      props.onSelectChange = onSelectedConfigsChange;
    }
    return (
      <ConfigListItem {...props} />
    );
  });
  return (
    <div className='ConfigList'>
      <h3>Configs</h3>
      <ul>{body}</ul>
    </div>
  );
};

ConfigList.propTypes = {
  configs: React.PropTypes.array.isRequired,
  selectable: React.PropTypes.bool.isRequired,
  selectedConfigs: React.PropTypes.array,
  openConfigs: React.PropTypes.array.isRequired,
  onSelectedConfigsChange: React.PropTypes.func,
  onOpenConfigsChange: React.PropTypes.func.isRequired
};

export default ConfigList;
