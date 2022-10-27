const { translate } = require("api-translator");
import { info } from "console";

let timeout = 60000;
jest.setTimeout(timeout);

beforeEach(() => {
	jest.useFakeTimers();
});
test('test "hello world" in Arabic', async () => {
	const result = await translate("hello world", { from: "en", to: "ar" });
	expect(result).toBe("مرحبا بالعالم");
});

test("test translate a long text > 5000", async () => {
	const text = "hello world ".repeat(502);
	//  info(text.length);
	const result = await translate(text, { from: "en", to: "ar" });
	expect(result).not.toBe(text);
});
