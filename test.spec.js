const config = require('.');

describe('prep.js - test request object preparation', () =>
{
	beforeAll(() =>
	{
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
		
		config.setConfig(test, "namespace");
		config.setConfig(test, "namespace2");
		config.setConfig(test2, "namespace");
		config.setConfig(blah);
	});

	it('Test that values were set in the namespace namepsace', () =>
	{
		expect.assertions(2);
		expect(config.getValue("fire", "namespace")).toBe("hot");
		expect(config.getValue("water", "namespace")).toBe("running");
	});

	it('Test that values were set in the namespace namepsace', () =>
	{
		expect.assertions(2);
		expect(config.getValue("water", "namespace2")).toBe("wet");
		expect(config.getValue("water", "namespace")).toBe("running");
	});

	it('Test that values were set in no namespace', () =>
	{
		expect.assertions(2);
		expect(config.getValue("gold")).toBe("expensive");
		expect(config.getValue("fire")).toBeUndefined();
	});
    
	it('Test that values can be accessed using dot notation', () =>
	{
		expect.assertions(2);
		expect(config.gold).toBe("expensive");
		expect(config.namespace.fire).toBe("hot");
	});
    
});



// console.log(configMgr.getValue("fire", "namespace"));
// console.log(configMgr.getValue("earth", "namespace"));
// console.log(configMgr.getValue("gold"));

// console.log(configMgr.namespace.fire);
// require('./test2Config');
