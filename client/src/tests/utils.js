import { shallow } from 'enzyme';

export const wrap = (component) => {
  return shallow(component);
};

export const wrapAndRender = (component) => {
  return wrap(component).render();
};

export const wrapAndSetState = (component, state) => {
  const wrapper = shallow(component);
  wrapper.setState(state);
  return wrapper;
};

export const setStateAndRender = (component, state) => {
  const statefulWrapper = wrapAndSetState(component, state);
  return statefulWrapper.render();
};
