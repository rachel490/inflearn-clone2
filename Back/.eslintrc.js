module.exports = {
    "env": {
        "browser": false,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base", 
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "script"
    },
    "settings": {
        "import/resolver": {
        "node": {
            "paths": ["src"]
            }
        }
    },
    "rules":{
        "no-use-before-define":"error",
        "no-shadow":"error",
        "no-plusplus":"off",
        "no-param-reassign":"off",
        "no-useless-concat":"off",
        "no-await-in-loop":"off",
        "no-restricted-syntax":"off",
        "func-names":"off",
        "import/no-extraneous-dependencies":"off",
        "import/order":"off",
        "import/no-self-import":"off"
    }
};
