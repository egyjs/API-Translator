import { Locale } from "./types/locales";
export interface Translate {
    from?: Locale;
    to: Locale;
}
export declare type Texts = string | string[] | Object;
export declare function translate(text: Texts, languages: Translate): Promise<string | string[] | Object>;
