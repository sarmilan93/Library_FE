module.exports = {
    preset: 'ts-jest',
    type: "module",
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass|jpg)$": "identity-obj-proxy"
    },
    globals: {
        "ts-jest": {
          isolatedModules: true,
        },
    },
};