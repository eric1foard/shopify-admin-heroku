const isDevEnvironment = (env) => !['staging', 'production'].includes(env);

const getAppHostname = (reviewAppName, appName) => `https://${reviewAppName || appName}.herokuapp.com`;

module.exports = {
    isDevEnvironment,
    getAppHostname
};