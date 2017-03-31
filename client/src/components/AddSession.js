import React from 'react';
import ConfigList from '../components/ConfigList';

const AddSession = ({ configs }) => (
  <div className='AddSession'>
    <button>Clone previous session</button>
    <ConfigList selectable={true} configs={configs} />
    <button>Next</button>
  </div>
);

AddSession.propTypes = {
  configs: React.PropTypes.array.isRequired
};

export default AddSession;
