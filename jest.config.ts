import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	preset: "jest-puppeteer",
	// testEnvironment: 'jsdom',
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
};
export default config;
