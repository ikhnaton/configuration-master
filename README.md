## Configuration Master

This is a simple utility to manage configuration information within your Node.js applications.

#### Release Notes
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