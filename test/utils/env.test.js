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