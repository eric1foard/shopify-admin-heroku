const env = require('../../utils/env');

describe('when checking to see if current environment is development', () => {
    it('should return true if current environment is development', () => {
        expect(env.isDevEnvironment('development')).toBeTruthy();
    });
    it('should return false if current environment is not development', () => {
        expect(env.isDevEnvironment('production')).toBeFalsy();
    });

    it('should return true as long as value is not production or staging', () => {
        expect(env.isDevEnvironment('test')).toBeTruthy();
    });
});

describe('when getting the app hostname', () => {
    it('should return hostname of reviewApp if in review environment', () => {
        expect(env.getAppHostname('review-pr-1', 'app-name-staging')).toEqual('https://review-pr-1.herokuapp.com');
    });
    it('should return hostname of staging or prod env if not review environment', () => {
        expect(env.getAppHostname(undefined, 'app-name-staging')).toEqual('https://app-name-staging.herokuapp.com');
    });
});