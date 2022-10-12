/* eslint-disable import/no-anonymous-default-export */
export const RELEASE_VERSION = '1.0.0';

export const _Environments: { [key: string]: any } = {
  production: {
    env: 'production',
    baseUrl: 'https://production-api.fleet.lmdmax.com/',
    release: RELEASE_VERSION,
  },
  development: {
    env: 'development',
    baseUrl: 'https://development-api.fleet.lmdmax.com/',
    release: RELEASE_VERSION,
    logs: true,
  },
};

export default () => {
  const env = process.env.ENV || 'development';
  return _Environments[env];
};
