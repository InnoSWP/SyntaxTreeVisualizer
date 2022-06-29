let acorn = require("acorn")


export class JavaScriptParser {
    parse(code) {
        return acorn.parse(code, {ecmaVersion: 2022});
    }

}