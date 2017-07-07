const configMgr = require('./');

console.log(configMgr.getValue("earth", "namespace"));
console.log(configMgr.direct.__COMMON.silver);
