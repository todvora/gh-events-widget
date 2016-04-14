module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console":0,
        "indent": [
            2,
            2
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "arrow-parens": 0
    }
};
