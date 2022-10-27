const { translate } = require("../dist");

// translate an array
(async () => {
	const result = await translate(["I love you"], { to: "ar" });
	console.log(result); // "أنا أحبك"
})();
