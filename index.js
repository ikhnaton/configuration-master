const _ = require('lodash');
const path = require('path');


class Config
{
	constructor()
	{
		// private variables
		const COMMON_KEY = "__COMMON";
		const myMap = {
			"process.stdout": process.stdout,
			"process.stderr": process.stderr
		}
		const _myConfig = {};
		_myConfig[COMMON_KEY] = {};

		const _processConfig = (data) =>
		{
			_.forEach(data, (value, key, collection) => {
				if (_.isObject(value))
				{
					collection[key] = _processConfig(value);
				}
				else if(_.isString(value))
				{
					const closeCurly = value.indexOf('}');
					const orValue = value.indexOf('||');
					if ((value.substring(0,2) == "${") && (closeCurly > 2))
					{
						collection[key] = _mapper(value.substring(2, closeCurly));

						if (((collection[key] == null) || (collection[key] == "")) && (orValue > 0))
						{
							collection[key] = value.substring(orValue + 2).trim();
						}
					}
				}
			});

			return data;
		}

		const _mapper = (value) =>
		{
			let retVal = myMap[value];
		
			if ((retVal == null) && (value.indexOf("process.env") == 0))
			{
				retVal = process.env[value.substring(12)];
			}
			return retVal;
		}

		this.setConfig = function(jsonObject, namespace)
		{
			jsonObject = _processConfig(jsonObject);
			_myConfig[namespace || COMMON_KEY] = _.merge(_myConfig[namespace || COMMON_KEY] || {}, jsonObject);
		}

		this.getValue = (key, namespace) =>
		{
			return (_myConfig[namespace || COMMON_KEY] == null)?null:_myConfig[namespace || COMMON_KEY][key];
		}

		this.getNamespace = (namespace) =>
		{
			if (Object.keys(_myConfig).includes(namespace))
			{
				return _myConfig[namespace];
			}
			return _myConfig[COMMON_KEY][namespace];
		}

		this.setValue = (key, value, namespace) =>
		{
			_myConfig[namespace || COMMON_KEY][key] = value;
		}

		this.loadConfig = (filename, namespace) =>
		{
			if (typeof __non_webpack_require__ !== 'undefined')
			{
				const tmp = __non_webpack_require__(filename);
				this.setConfig(tmp, namespace);
			}
			else {
				const tmp = require(filename);
				this.setConfig(tmp, namespace);
			}
		}
	}


}
const tmp = new Config();
const config = new Proxy(tmp, {
	get: function(target, name, receiver) {
		if (Object.keys(target).includes(name))
		{
			return target[name];
		}

		return target.getNamespace(name);
	  }
});

module.exports = config;
