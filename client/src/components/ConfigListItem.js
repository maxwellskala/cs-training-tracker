import React from 'react';

const renderSettings = (config) => {
  return Object.keys(config).map((key) => {
    if (key === 'user' || key === 'id') {
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

const renderCheckbox = (selectable, isSelected, onChange) => {
  if (!selectable) {
    return null;
  }
  return <input type='checkbox' onChange={onChange} checked={isSelected} />;
};

const ConfigListItem = ({
  config,
  isOpen,
  isSelected,
  selectable,
  onOpenChange,
  onSelectChange
}) => {
  const handleSelectChange = selectable
    ? () => onSelectChange(config.id)
    : () => {};
  const onClick = () => onOpenChange(config.id);
  return (
    <li className='ConfigListItem'>
      <span onClick={onClick}>{config.name}</span>
      {renderCheckbox(selectable, isSelected, handleSelectChange)}
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
  onSelectChange: React.PropTypes.func
};

export default ConfigListItem;
