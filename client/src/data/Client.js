function parseJSON(response) {
  return response.json();
}

function prepareErrors(response) {
  const validationErrors = response.validationErrors;
  if (!validationErrors) {
    return response;
  }
  const processedErrors = validationErrors.map((rawError) => {
    return rawError.msg;
  });
  return { ...response, validationErrors: processedErrors };
}

function checkSession(cb) {
  return fetch('/api/user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get',
    credentials: 'same-origin'
  })
  .then(parseJSON)
  .then(prepareErrors)
  .then(cb);
}

function signup(email, password, cb) {
  return fetch('/api/user/signup', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(parseJSON)
  .then(prepareErrors)
  .then(cb);
}

function login(email, password, cb) {
  return fetch('/api/user/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'post',
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(parseJSON)
  .then(prepareErrors)
  .then(cb);
}

function logout(cb) {
  return fetch('/api/user/logout', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get',
    credentials: 'same-origin'
  })
  .then(parseJSON)
  .then(prepareErrors)
  .then(cb);
}

function fetchConfigs(userId, cb) {
  const fakeResponse = [
    {
      user: 1,
      name: 'config1',
      weapon: 'AK-47',
      distance: 2,
      count: 100,
      shotsToKill: 1,
      size: '10R',
      delay: 0.25,
      duration: 0.5
    },
    {
      user: 1,
      name: 'config2',
      weapon: 'AK-47',
      distance: 2,
      count: 25,
      shotsToKill: 5,
      size: '10R',
      delay: 0,
      duration: 1.25
    },
    {
      user: 1,
      name: 'config3',
      weapon: 'AK-47',
      distance: 2,
      count: 25,
      shotsToKill: 5,
      size: '8R',
      delay: 0,
      duration: 1.25
    },
    {
      user: 1,
      name: 'config4',
      weapon: 'AK-47',
      distance: 3,
      count: 25,
      shotsToKill: 1,
      size: 'HEAD',
      delay: 0,
      duration: 1.0
    },
    {
      user: 1,
      name: 'config5',
      weapon: 'AK-47',
      distance: 4,
      count: 25,
      shotsToKill: 1,
      size: 'HEAD',
      delay: 0,
      duration: 1.0
    },
  ];
  cb(fakeResponse);
}

const Client = { checkSession, signup, login, logout, fetchConfigs };
export default Client;