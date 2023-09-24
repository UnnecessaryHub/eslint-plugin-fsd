> :warning: **THIS PACKAGE IS DEPRECATED**

---

# eslint-plugin-gearonix

gearonix plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-gearonix`:

```sh
npm install eslint-plugin-gearonix --save-dev
```

## Usage

Add `gearonix-eslint-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "gearonix-eslint-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "gearonix-eslint-plugin/rule-name": 2
    }
}
```



