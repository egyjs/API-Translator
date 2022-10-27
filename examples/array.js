const { translate } = require("../dist");

// translate an array
(async () => {
	const result = await translate(["i", "you", "he", "she"], { to: "fr" });
	console.log(result); // [ 'je', 'tu', 'il', 'elle' ]
})();
