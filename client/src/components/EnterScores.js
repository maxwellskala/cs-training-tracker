import React from 'react';

const renderScoreInputs = (configScores, onUpdateConfigScore) => {
  const onChange = (configId) => (e) => {
    const parsedScore = parseInt(e.target.value, 10);
    if (isNaN(parsedScore)) {
      return;
    }
    onUpdateConfigScore(configId, parsedScore);
  };

  return configScores.map((score) => (
    <tr key={score.name}>
      <td>{score.name}</td>
      <td>
        <input type='text' value={score.score} onChange={onChange(score.id)} />
      </td>
      <td>{score.maximum}</td>
    </tr>
  ));
}

const EnterScores = ({ configScores, onUpdateConfigScore }) => (
  <table className='EnterScores'>
    <thead>
      <tr>
        <th>Config</th>
        <th>Score</th>
        <th>Maximum</th>
      </tr>
    </thead>
    <tbody>
      {renderScoreInputs(configScores, onUpdateConfigScore)}
    </tbody>
  </table>
);

EnterScores.propTypes = {
  configScores: React.PropTypes.array.isRequired,
  onUpdateConfigScore: React.PropTypes.func.isRequired
};

export default EnterScores;
