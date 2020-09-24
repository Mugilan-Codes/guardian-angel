import { getToken } from './token';

const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (email, password, shouldSucceed = true) => {
  console.log({ email, password });

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

export const createAccount = (email, password, shouldSucceed = true) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

const getAuthenticationToken = () => 'successful_fake_token';

export const getUsers = async (shouldSucceed = true) => {
  const token = await getToken();

  if (token !== 'successful_fake_token') {
    return mockFailure({ error: 401, message: 'Invalid Request' });
  }

  return mockSuccess({
    users: [
      {
        email: 'test@test.ca',
      },
      {
        email: 'test2@test.ca',
      },
    ],
  });
};
