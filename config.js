/*
 * Create and export configuration variables.
 */

const environments = {};

environments.staging = {
    'httpPort': 3000,
    'envName': 'staging'
};

environments.production = {
    'httpPort': 5000,
    'envName': 'production'
};

let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;