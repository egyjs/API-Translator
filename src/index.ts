import * as puppeteer from "puppeteer";

import { Locale } from "./types/locales";
import { normalizer } from "./normalizer";

const GOOGLE_TRANSLATE_CHARACTER_LIMIT = 5000;

export interface Translate {
	from?: Locale;
	to: Locale;
}

function breakText(text: string, limit: number): string[] {
	text = text.trim();
	const regex = new RegExp(`(.{1,${limit}}(\\s|$))`, "gm");
	let textArray = text.match(regex);
	if (textArray) {
		textArray = textArray.map(t => t.trim());
	}
	return textArray || [];
}

async function google_translate(
	page: puppeteer.Page,
	txt: string,
): Promise<string[]> {
	let translatedTexts: string[] = [];
	await page
		.evaluate(text => {
			console.log("translating", text);
			// add text to textarea
			let el = document.querySelector(
				'textarea[jsname="BJE2fc"]',
			) as HTMLTextAreaElement;
			el.focus();
			el.value = text as string;
			el.dispatchEvent(new Event("input", { bubbles: true }));
		}, txt)
		.then(() =>
			page.waitForResponse(async response =>
				response.url().includes("_/TranslateWebserverUi"),
			),
		)
		.then(() =>
			page.waitForResponse(async response =>
				response.url().includes("/log?format=json"),
			),
		)
		.then(async () => {
			let text = await page
				.waitForSelector("span[jsname=jqKxS]")
				.then(() =>
					page.evaluate(() => {
						let el = document.querySelector(
							"span[jsname=jqKxS]",
						) as HTMLElement;
						return el.innerText;
					}),
				);
			translatedTexts.push(text);
		});
	return translatedTexts;
}

interface TranslatorParams {
	from: string;
	to: string;
	text: string | Array<string>;
}

async function translator({
	from,
	to,
	text,
}: TranslatorParams): Promise<string | string[]> {
	try {
		const browser = await puppeteer.launch({
			// headless: false,
			// devtools: true,
			timeout: 60000,
		});
		const isString = typeof text === "string";
		const textsArray = isString ? [text] : text;
		let translatedTexts: string[] = [];

		const page = await browser.newPage();
		const url = `https://translate.google.com/?sl=${from}&tl=${to}&op=translate`;

		// open page and wait for it to load
		await page.goto(url).then(() => page.waitForSelector("textarea"));

		// for each text, translate it and add it to the translatedTexts array
		for (const txt of textsArray) {
			if (txt.length > GOOGLE_TRANSLATE_CHARACTER_LIMIT) {
				const textArray = breakText(
					txt,
					GOOGLE_TRANSLATE_CHARACTER_LIMIT,
				);
				for (const text of textArray) {
					const translatedText = await google_translate(page, text);
					translatedTexts.push(...translatedText);
				}
			} else {
				const translatedText = await google_translate(page, txt);
				translatedTexts.push(...translatedText);
			}
		}
		await browser.close();

		if (!translatedTexts.length) {
			// if no text was translated, throw an error
			return Promise.reject(
				Error(
					"No text was translated, try again, " +
						JSON.stringify(translatedTexts),
				),
			);
		}

		return isString ? translatedTexts[0] : translatedTexts;
	} catch (error) {
		throw error;
	}
}

export async function translate(
	text: string | Array<string>,
	languages: Translate,
): Promise<string | string[]> {
	const from = normalizer(languages?.from || "auto");
	const to = normalizer(languages.to);

	if (from === to) {
		console.log("from and to are the same!, returning text");
		return text;
	}

	return await translator({
		from: from,
		to: to,
		text: text,
	});
}
