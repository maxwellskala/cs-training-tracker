import React from 'react';

const EnterScores = ({ configScores, onUpdateConfigScore }) => (
  <div>Enter scores here</div>
);

EnterScores.propTypes = {
  configScores: React.PropTypes.array.isRequired,
  onUpdateConfigScore: React.PropTypes.func.isRequired
};

export default EnterScores;
