"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const puppeteer = __importStar(require("puppeteer"));
const normalizer_1 = require("./normalizer");
const GOOGLE_TRANSLATE_CHARACTER_LIMIT = 5000;
function breakText(text, limit) {
    text = text.trim();
    const regex = new RegExp(`(.{1,${limit}}(\\s|$))`, "gm");
    let textArray = text.match(regex);
    if (textArray) {
        textArray = textArray.map(t => t.trim());
    }
    return textArray || [];
}
function google_translate(page, txt) {
    return __awaiter(this, void 0, void 0, function* () {
        let translatedTexts = [];
        yield page
            .evaluate(text => {
            console.log("translating", text);
            let el = document.querySelector('textarea[jsname="BJE2fc"]');
            el.focus();
            el.value = text;
            el.dispatchEvent(new Event("input", { bubbles: true }));
        }, txt)
            .then(() => page.waitForResponse((response) => __awaiter(this, void 0, void 0, function* () { return response.url().includes("_/TranslateWebserverUi"); })))
            .then(() => page.waitForResponse((response) => __awaiter(this, void 0, void 0, function* () { return response.url().includes("/log?format=json"); })))
            .then(() => __awaiter(this, void 0, void 0, function* () {
            let text = yield page
                .waitForSelector("span[jsname=jqKxS]")
                .then(() => page.evaluate(() => {
                let el = document.querySelector("span[jsname=jqKxS]");
                return el.innerText;
            }));
            translatedTexts.push(text);
        }));
        return translatedTexts;
    });
}
function translator({ from, to, text, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer.launch({
                timeout: 60000,
            });
            const isString = typeof text === "string";
            const textsArray = isString ? [text] : text;
            let translatedTexts = [];
            const page = yield browser.newPage();
            const url = `https://translate.google.com/?sl=${from}&tl=${to}&op=translate`;
            yield page.goto(url).then(() => page.waitForSelector("textarea"));
            for (const txt of textsArray) {
                if (txt.length > GOOGLE_TRANSLATE_CHARACTER_LIMIT) {
                    const textArray = breakText(txt, GOOGLE_TRANSLATE_CHARACTER_LIMIT);
                    for (const text of textArray) {
                        const translatedText = yield google_translate(page, text);
                        translatedTexts.push(...translatedText);
                    }
                }
                else {
                    const translatedText = yield google_translate(page, txt);
                    translatedTexts.push(...translatedText);
                }
            }
            yield browser.close();
            if (!translatedTexts.length) {
                return Promise.reject(Error("No text was translated, try again, " +
                    JSON.stringify(translatedTexts)));
            }
            return isString ? translatedTexts[0] : translatedTexts;
        }
        catch (error) {
            throw error;
        }
    });
}
function translate(text, languages) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = (0, normalizer_1.normalizer)((languages === null || languages === void 0 ? void 0 : languages.from) || "auto");
        const to = (0, normalizer_1.normalizer)(languages.to);
        if (from === to) {
            console.log("from and to are the same!, returning text");
            return text;
        }
        return yield translator({
            from: from,
            to: to,
            text: text,
        });
    });
}
exports.translate = translate;
