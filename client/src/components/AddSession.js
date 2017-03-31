import React, { Component } from 'react';
import ConfigList from '../components/ConfigList';
import EnterScores from '../components/EnterScores';

const STEPS = {
  chooseConfigs: 'chooseConfigs',
  enterScores: 'enterScores'
};

const getOtherStep = (prevState) => {
  const otherStep = prevState.step === STEPS.chooseConfigs
    ? STEPS.enterScores
    : STEPS.chooseConfigs;
  return { step: otherStep };
};

const updateSelectedConfigs = (configId) => (prevState) => {
  const prevSelectedConfigs = prevState.selectedConfigs;
  if (prevSelectedConfigs.includes(configId)) {
    const newSelectedConfigs = prevSelectedConfigs.filter((id) => {
      return id !== configId;
    });
    return { selectedConfigs: newSelectedConfigs };
  }
  return { selectedConfigs: prevSelectedConfigs.concat([configId]) };
};

const updateConfigScore = (configId, score) => (prevState) => {
  return {
    scores: { ...prevState.scores, [configId]: score }
  };
};

const parseConfigScores = (configs, selectedConfigs, scores) => {
  const filteredConfigs = configs.filter((config) => {
    return selectedConfigs.includes(config.id);
  });
  return filteredConfigs.map((config) => {
    const score = scores[config.id] || 0;
    return {
      name: config.name,
      score: score,
      maximum: config.count
    };
  });
};

class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: STEPS.chooseConfigs,
      selectedConfigs: [],
      scores: {}
    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleConfigSelectChange = this.handleConfigSelectChange.bind(this);
    this.handleUpdateConfigScore = this.handleUpdateConfigScore.bind(this);
  };

  handleStepChange() {
    this.setState(getOtherStep);
  };

  handleConfigSelectChange(configId) {
    this.setState(
      updateSelectedConfigs(configId)
    );
  };

  handleUpdateConfigScore(configId, score) {
    this.setState(
      updateConfigScore(configId, score)
    );
  };

  render() {
    const { configs } = this.props;
    const { step, selectedConfigs, scores } = this.state;
    if (step === STEPS.chooseConfigs) {
      return (
        <div className='AddSession'>
          <button>Clone previous session</button>
          <ConfigList
            selectable={true}
            configs={configs}
            selectedConfigs={selectedConfigs}
            onSelectedConfigsChange={this.handleConfigSelectChange}
          />
          <button onClick={this.handleStepChange}>Next</button>
        </div>
      );
    }
    return (
      <div className='AddSession'>
        <EnterScores
          configScores={parseConfigScores(configs, selectedConfigs, scores)}
          onUpdateConfigScore={this.handleUpdateConfigScore}
        />
        <button onClick={this.handleStepChange}>Back</button>
        <button>Save</button>
      </div>
    );
  };
};

AddSession.propTypes = {
  configs: React.PropTypes.array.isRequired
};

export default AddSession;
