const configMgr = require('./');

console.log(configMgr.getValue("earth", "namespace"));
console.log(configMgr.silver);

configMgr.silver = 9
console.log(configMgr.silver);