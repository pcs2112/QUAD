/**
 * Application configuration.
 *
 * @module config
 * @type {Object}
 */
const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT,
  isProduction: process.env.NODE_ENV === 'production',
  app: {
    title: 'QUAD Admin Console',
    description: 'QUAD Admin Console'
  },
  env: {
    httpsEnabled: Object.prototype.hasOwnProperty.call(process.env, 'HTTPS_ENABLED')
      ? (process.env.HTTPS_ENABLED === true || process.env.HTTPS_ENABLED === 'true')
      : (typeof window !== 'undefined' && window.location.protocol.indexOf('https') > -1)
  }
};

module.exports = config;
