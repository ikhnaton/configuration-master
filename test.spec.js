const config = require('.');

describe('prep.js - test request object preparation', () =>
{
	beforeAll(() =>
	{
		let test = {
			water: "wet",
			fire: "hot",
			earth: "solid",
			nested: {
				sub1: {
					suba: "something",
					subb: "deep"
				},
				sub2: {
					dive: "down",
					water: "wetter"
				}
			}
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
	
	it('Test that nested objects work', () => 
	{
		expect.assertions(4);
		expect(config.namespace).not.toBeNull();
		expect(config.namespace.nested).not.toBeNull();
		expect(config.namespace.nested.sub2).not.toBeNull();
		expect(config.namespace.nested.sub2.water).toBe("wetter");
	});

	it('Test that values can be set', () =>
	{
		expect.assertions(2);
		config.setValue("other", 27);
		config.setValue("otherValue", 36, "namespace");
		expect(config.other).toBe(27);
		expect(config.namespace.otherValue).toBe(36);
	});
});



// console.log(configMgr.getValue("fire", "namespace"));
// console.log(configMgr.getValue("earth", "namespace"));
// console.log(configMgr.getValue("gold"));

// console.log(configMgr.namespace.fire);
// require('./test2Config');
