import React from 'react';
import { routeNode } from 'react-router5';

const Loading = () => <div>Loading...</div>;

export default routeNode('loading')(Loading);
