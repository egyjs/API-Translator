import { Translate } from "./src";

declare module "api-translator" {
	export function translate(data: Translate): Promise<string>;
}
