const configMgr = require('./');

let test = {
	water: "wet",
	fire: "hot",
	earth: "solid"
};

let test2 = {
	water: "running",
	earth: "${process.env.LOGNAME}"
};

let blah = {
	dust: "ball",
	gold: "expensive",
	silver: true
};

configMgr.setConfig(test, "namespace");
configMgr.setConfig(test2, "namespace");
configMgr.setConfig(blah);

console.log(configMgr.getValue("fire", "namespace"));
console.log(configMgr.getValue("earth", "namespace"));
console.log(configMgr.getValue("gold"));

console.log(configMgr.direct.namespace.fire);
require('./test2Config');
