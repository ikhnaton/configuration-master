const _ = require('lodash');

// private variables
const myConfig = {};
const COMMON_KEY = "Unique key not likely used by any other configurations";
const myMap = {
	"process.stdout": process.stdout,
	"process.stderr": process.stderr
}

function _processConfig(data)
{
	_.forEach(data, (value, key, collection) => {
		if (_.isObject(value))
		{
			collection[key] = _processConfig(value);
		}
		else if(_.isString(value))
		{
			if ((value.substring(0,2) == "${") && (value.substring(value.length-1) == "}"))
			{
				collection[key] = _mapper(value.substring(2, value.length-1));
			}
		}
	});

	return data;
}

function _mapper(value)
{
	let retVal = myMap[value];

	if ((retVal == null) && (value.indexOf("process.env") == 0))
	{
		retVal = process.env[value.substring(12)];
	}
	return retVal
}

class config
{
	loadConfig(filename, namespace)
	{
		let tmp = require(filename);
		this.setConfig(tmp, namespace);
	}

	setConfig(jsonObject, namespace)
	{
		jsonObject = _processConfig(jsonObject);
		myConfig[namespace || COMMON_KEY] = _.merge(myConfig[namespace || COMMON_KEY] || {}, jsonObject);
	}

	getValue(key, namespace)
	{

		return (myConfig[namespace || COMMON_KEY] == null)?null:myConfig[namespace || COMMON_KEY][key];
	}
}

module.exports = new config();
