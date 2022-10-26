const { translate } = require("../dist");
const { log } = require("console");

(async () => {
	const result = await translate("hello world", { to: "ar" });
	log(result);
})();
