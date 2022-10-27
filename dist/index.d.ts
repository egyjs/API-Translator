import { Locale } from "./types/locales";
export interface Translate {
    from?: Locale;
    to: Locale;
}
export declare function translate(text: string | Array<string>, languages: Translate): Promise<string | string[]>;
