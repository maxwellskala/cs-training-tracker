export const updateConfigState = (stateKey, configId) => (prevState) => {
  const prevConfigs = prevState[stateKey];
  if (prevConfigs.includes(configId)) {
    const newConfigs = prevConfigs.filter((id) => {
      return id !== configId;
    });
    return { [stateKey]: newConfigs };
  }
  return { [stateKey]: prevConfigs.concat([configId]) };
};
