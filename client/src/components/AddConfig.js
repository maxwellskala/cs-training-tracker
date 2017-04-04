import React from 'react';
import { Link } from 'react-router5';
import * as RouteNames from '../constants/RouteNames';

const CONFIG_FIELDS = [
  'Weapon',
  'Distance',
  'Count',
  'Shots to kill',
  'Size',
  'Delay',
  'Duration'
];

const renderFieldInputs = () => {
  return CONFIG_FIELDS.map((field) => {
    return (
      <tr key={field}>
        <td>
          {field}
        </td>
        <td>
          <input type='text' />
        </td>
      </tr>
    );
  });
};

export default () => {
  return (
    <div className='AddConfig'>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {renderFieldInputs()}
        </tbody>
      </table>
      <button>Save</button>
      <Link routeName={RouteNames.AIM_VIEW_CONFIGS}>
        <button>Back</button>
      </Link>
    </div>
  );
};
