import { typescript } from "./typescript"
import { tslint } from "./tslint"
import { sass, sassGlob, noSass } from "./sass"
import { css, noCss } from "./css"
import { fonts, noFonts } from "./fonts"
import { images, noImages } from "./images"

export const clientRules = [typescript, tslint, css, sass, sassGlob, fonts, images];
export const serverRules = [typescript, tslint, noCss, noSass, noFonts, noImages];
