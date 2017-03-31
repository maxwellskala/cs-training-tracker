import React from 'react';

const renderSettings = (config) => {
  return Object.keys(config).map((key) => {
    if (key === 'user') {
      return null;
    }
    return (
      <tr key={key}>
        <td>
          {key}
        </td>
        <td>
          {config[key]}
        </td>
      </tr>
    );
  });
};

const renderDetails = (isOpen, config) => {
  if (!isOpen) {
    return null;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Setting</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {renderSettings(config)}
      </tbody>
    </table>
  );
};

const renderRow = (
  config,
  onSelectChange,
  selectable,
  isSelected
) => {
  const onChange = () => onSelectChange(config.id);
  if (selectable) {
    return (
      <span>
        {config.name}
        <input
          type='checkbox'
          onChange={onChange}
          checked={isSelected}
        />
      </span>
    );
  }
  return <span>{name}</span>;
};

const ConfigListItem = ({
  config,
  isOpen,
  isSelected,
  selectable,
  onOpenChange,
  onSelectChange
}) => {
  const onClick = () => onOpenChange(config.id);
  return (
    <li className='ConfigListItem' onClick={onClick}>
      {renderRow(config, onSelectChange, selectable, isSelected)}
      {renderDetails(isOpen, config)}
    </li>
  );
};

ConfigListItem.propTypes = {
  config: React.PropTypes.object.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  selectable: React.PropTypes.bool.isRequired,
  onOpenChange: React.PropTypes.func.isRequired,
  onSelectChange: React.PropTypes.func.isRequired
};

export default ConfigListItem;
