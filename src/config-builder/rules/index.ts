import { typescript } from "./typescript"
import { tslint } from "./tslint"
import { sass, sassGlob, noSass } from "./sass"
import { fonts, noFonts } from "./fonts"
import { images, noImages } from "./images"

export const clientRules = [typescript, tslint, sass, sassGlob, fonts, images];
export const serverRules = [typescript, tslint, noSass, noFonts, noImages];
