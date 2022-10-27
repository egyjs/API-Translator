"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizer = void 0;
const normalizeLocales = {
    "pt-BR": "pt",
};
const normalizer = (locale) => {
    if (normalizeLocales[locale]) {
        return normalizeLocales[locale];
    }
    return locale;
};
exports.normalizer = normalizer;
