import React, { Component } from 'react';
import ConfigList from '../components/ConfigList';
import EnterScores from '../components/EnterScores';
import { updateConfigState } from '../utils/stateReducers';

export const STEPS = {
  chooseConfigs: 'chooseConfigs',
  enterScores: 'enterScores'
}; // exported for testing

const getOtherStep = (prevState) => {
  const otherStep = prevState.step === STEPS.chooseConfigs
    ? STEPS.enterScores
    : STEPS.chooseConfigs;
  return { step: otherStep };
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
      id: config.id,
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
      openConfigs: [],
      scores: {}
    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleConfigSelectChange = this.handleConfigSelectChange.bind(this);
    this.handleConfigOpenChange = this.handleConfigOpenChange.bind(this);
    this.handleUpdateConfigScore = this.handleUpdateConfigScore.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  };

  handleStepChange() {
    this.setState(getOtherStep);
  };

  handleConfigSelectChange(configId) {
    this.setState(
      updateConfigState('selectedConfigs', configId)
    );
  };

  handleConfigOpenChange(configId) {
    this.setState(
      updateConfigState('openConfigs', configId)
    );
  }

  handleUpdateConfigScore(configId, score) {
    this.setState(
      updateConfigScore(configId, score)
    );
  };

  renderNextButton() {
    if (!this.state.selectedConfigs.length > 0) {
      return null;
    }
    return <button onClick={this.handleStepChange}>Next</button>;
  };

  render() {
    const { configs } = this.props;
    const {
      step,
      selectedConfigs,
      openConfigs,
      scores
    } = this.state;
    if (step === STEPS.chooseConfigs) {
      return (
        <div className='AddSession'>
          <button>Clone previous session</button>
          <ConfigList
            selectable={true}
            configs={configs}
            selectedConfigs={selectedConfigs}
            openConfigs={openConfigs}
            onSelectedConfigsChange={this.handleConfigSelectChange}
            onOpenConfigsChange={this.handleConfigOpenChange}
          />
          {this.renderNextButton()}
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
