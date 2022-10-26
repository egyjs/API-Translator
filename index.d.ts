import { Translate } from "./src";

declare module "free-translate" {
	export function translate(data: Translate): Promise<string>;
}
