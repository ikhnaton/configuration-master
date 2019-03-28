## Configuration Master

This is a simple utility to manage configuration information within your Node.js applications.

#### Release Notes
v0.1.6
- add ability to use environment variables and then hardcoded value if environment variable missing

v0.1.5
- prevent Reference error if not using Webpack

v0.1.4
- adjust method for loading configs.  it is now the responsibility of the caller to provide the correct path.

v0.1.3
- add additional tests

v0.1.2
- change loader to use path.resolve and require.main.filename

v0.1.1
- add tests

v0.1.0
- breaks .direct. functionality from earlier versions.
- can now access properties directly.

#### Installation

`npm install configuration-master`

#### Usage

>**initialization**
>```js
>const config = require('configuration-master');
>```
>
>**load a config**
>```js
>config.loadConfig('config.json');
>```
>or
>
>```js
>config.loadConfig('config.json','namespace');
>```
>
>**set config from existing object**
>```js
>const settings = {
>	settingA: "value A",
>	settingB: "value B",
>	settingC: "value C"
>}
>
>config.setConfig(settings);
>```
>or
>
>```js
>config.setConfig(settings,'namespace');
>```
>
>**get value from config**
>```js
>config.getValue("settingA");  //returns 'value A'
>```
>or
>
>```js
>config.getValue('settingA', 'namespace');  //returns 'value A'
>```
>or
>
>```js
>config.namespace.settingsA  //returns 'value A'
>```