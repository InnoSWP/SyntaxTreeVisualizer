// import {get_tree} from "../tree_builder/tree_builder";
// import {JavaScriptParser} from "../parser/JavaScriptParser";
let tree = require("../tree_builder/tree_builder");
let parser = require("../parser/JavaScriptParser");

test("Simple test 1+1", () => {
    expect(tree.get_tree(new parser.JavaScriptParser().parse("1+1"), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1",
            },
            {
                "from": "1",
                "id": "1->2",
                "to": "2",
            },
            {
                "from": "1",
                "id": "1->3",
                "to": "3",
            },
        ],
        "nodes": [
            {
                "id": "0",
                "text": "Program",
            },
            {
                "id": "1",
                "text": "+",
            },
            {
                "id": "2",
                "text": "1",
            },
            {
                "id": "3",
                "text": "1",
            },
        ]
    });
});
