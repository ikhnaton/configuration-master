## Configuration Master

This is a simple utility to manage configuration information within your Node.js applications.

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
>config.getValue("settingsA");  //returns 'value A'
>```
>or
>
>```js
>config.getValue('settingsA', 'namespace');  //returns 'value A'
>```
>or
>
>```js
>config.direct.namespace.settingsA  //returns 'value A'
>```