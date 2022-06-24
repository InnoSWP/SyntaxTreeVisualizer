import {get_tree} from "../tree_builder/tree_builder";
import {JavaScriptParser} from "../parser/JavaScriptParser"

test("Simple test 1+1", () => {
    expect(get_tree(new JavaScriptParser().parse("1+1"), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1"
            },
            {
                "from": "1",
                "id": "1->2",
                "to": "2"
            },
            {
                "from": "1",
                "id": "1->3",
                "to": "3"
            }
        ],
        "nodes": [
            {
                "depth": 0,
                "end": 3,
                "id": "0",
                "start": 0,
                "text": "Program"
            },
            {
                "depth": 1,
                "end": 3,
                "id": "1",
                "start": 0,
                "text": "+"
            },
            {
                "depth": 2,
                "end": 1,
                "id": "2",
                "start": 0,
                "text": "1"
            },
            {
                "depth": 2,
                "end": 3,
                "id": "3",
                "start": 2,
                "text": "1"
            }
        ]
    });
});

test("Factorial function test", () => {
    expect(get_tree(new JavaScriptParser().parse(
        "function factorial(n){\n" +
        "    //base case\n" +
        "    if(n == 0 || n == 1){\n" +
        "        return 1;\n" +
        "    //recursive case\n" +
        "    }else{\n" +
        "        return n * factorial(n-1);\n" +
        "    }\n" +
        "}\n" +
        "let n = 4;\n" +
        "answer = factorial(n)\n" +
        "console.log(\"The factorial of \" + n + \" is \" + answer);"
    ), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1"
            },
            {
                "from": "1",
                "id": "1->2",
                "text": "arg 1",
                "to": "2"
            },
            {
                "from": "1",
                "id": "1->3",
                "text": "body",
                "to": "3"
            },
            {
                "from": "3",
                "id": "3->4",
                "text": "condition",
                "to": "4"
            },
            {
                "from": "4",
                "id": "4->5",
                "to": "5"
            },
            {
                "from": "5",
                "id": "5->6",
                "to": "6"
            },
            {
                "from": "5",
                "id": "5->7",
                "to": "7"
            },
            {
                "from": "4",
                "id": "4->8",
                "to": "8"
            },
            {
                "from": "8",
                "id": "8->9",
                "to": "9"
            },
            {
                "from": "8",
                "id": "8->10",
                "to": "10"
            },
            {
                "from": "3",
                "id": "3->11",
                "text": "body",
                "to": "11"
            },
            {
                "from": "11",
                "id": "11->12",
                "to": "12"
            },
            {
                "from": "3",
                "id": "3->13",
                "to": "13"
            },
            {
                "from": "13",
                "id": "13->14",
                "text": "body",
                "to": "14"
            },
            {
                "from": "14",
                "id": "14->15",
                "to": "15"
            },
            {
                "from": "15",
                "id": "15->16",
                "to": "16"
            },
            {
                "from": "15",
                "id": "15->17",
                "to": "17"
            },
            {
                "from": "17",
                "id": "17->18",
                "text": "arg 1",
                "to": "18"
            },
            {
                "from": "18",
                "id": "18->19",
                "to": "19"
            },
            {
                "from": "18",
                "id": "18->20",
                "to": "20"
            },
            {
                "from": "0",
                "id": "0->21",
                "to": "21"
            },
            {
                "from": "21",
                "id": "21->22",
                "to": "22"
            },
            {
                "from": "22",
                "id": "22->23",
                "to": "23"
            },
            {
                "from": "0",
                "id": "0->24",
                "to": "24"
            },
            {
                "from": "24",
                "id": "24->25",
                "to": "25"
            },
            {
                "from": "25",
                "id": "25->26",
                "text": "arg 1",
                "to": "26"
            },
            {
                "from": "0",
                "id": "0->27",
                "to": "27"
            },
            {
                "from": "27",
                "id": "27->28",
                "text": "arg 1",
                "to": "28"
            },
            {
                "from": "28",
                "id": "28->29",
                "to": "29"
            },
            {
                "from": "29",
                "id": "29->30",
                "to": "30"
            },
            {
                "from": "30",
                "id": "30->31",
                "to": "31"
            },
            {
                "from": "30",
                "id": "30->32",
                "to": "32"
            },
            {
                "from": "29",
                "id": "29->33",
                "to": "33"
            },
            {
                "from": "28",
                "id": "28->34",
                "to": "34"
            }
        ],
        "nodes": [
            {
                "depth": 0,
                "end": 246,
                "id": "0",
                "start": 0,
                "text": "Program"
            },
            {
                "depth": 1,
                "end": 157,
                "id": "1",
                "start": 0,
                "text": "function factorial"
            },
            {
                "depth": 2,
                "end": 20,
                "id": "2",
                "start": 19,
                "text": "n"
            },
            {
                "depth": 2,
                "end": 155,
                "id": "3",
                "start": 43,
                "text": "if"
            },
            {
                "depth": 3,
                "end": 62,
                "id": "4",
                "start": 46,
                "text": "||"
            },
            {
                "depth": 4,
                "end": 52,
                "id": "5",
                "start": 46,
                "text": "=="
            },
            {
                "depth": 5,
                "end": 47,
                "id": "6",
                "start": 46,
                "text": "n"
            },
            {
                "depth": 5,
                "end": 52,
                "id": "7",
                "start": 51,
                "text": "0"
            },
            {
                "depth": 4,
                "end": 62,
                "id": "8",
                "start": 56,
                "text": "=="
            },
            {
                "depth": 5,
                "end": 57,
                "id": "9",
                "start": 56,
                "text": "n"
            },
            {
                "depth": 5,
                "end": 62,
                "id": "10",
                "start": 61,
                "text": "1"
            },
            {
                "depth": 3,
                "end": 82,
                "id": "11",
                "start": 73,
                "text": "return"
            },
            {
                "depth": 4,
                "end": 81,
                "id": "12",
                "start": 80,
                "text": "1"
            },
            {
                "depth": 2,
                "end": 155,
                "id": "13",
                "start": 113,
                "text": "else"
            },
            {
                "depth": 3,
                "end": 149,
                "id": "14",
                "start": 123,
                "text": "return"
            },
            {
                "depth": 4,
                "end": 148,
                "id": "15",
                "start": 130,
                "text": "*"
            },
            {
                "depth": 5,
                "end": 131,
                "id": "16",
                "start": 130,
                "text": "n"
            },
            {
                "depth": 5,
                "end": 148,
                "id": "17",
                "start": 134,
                "text": "call factorial"
            },
            {
                "depth": 6,
                "end": 147,
                "id": "18",
                "start": 144,
                "text": "-"
            },
            {
                "depth": 7,
                "end": 145,
                "id": "19",
                "start": 144,
                "text": "n"
            },
            {
                "depth": 7,
                "end": 147,
                "id": "20",
                "start": 146,
                "text": "1"
            },
            {
                "depth": 1,
                "end": 168,
                "id": "21",
                "start": 158,
                "text": "let"
            },
            {
                "depth": 2,
                "end": 167,
                "id": "22",
                "start": 162,
                "text": "n="
            },
            {
                "depth": 3,
                "end": 167,
                "id": "23",
                "start": 166,
                "text": "4"
            },
            {
                "depth": 1,
                "end": 190,
                "id": "24",
                "start": 169,
                "text": "answer="
            },
            {
                "depth": 2,
                "end": 190,
                "id": "25",
                "start": 178,
                "text": "call factorial"
            },
            {
                "depth": 3,
                "end": 189,
                "id": "26",
                "start": 188,
                "text": "n"
            },
            {
                "depth": 1,
                "end": 245,
                "id": "27",
                "start": 191,
                "text": "call console.log"
            },
            {
                "depth": 2,
                "end": 244,
                "id": "28",
                "start": 203,
                "text": "+"
            },
            {
                "depth": 3,
                "end": 235,
                "id": "29",
                "start": 203,
                "text": "+"
            },
            {
                "depth": 4,
                "end": 226,
                "id": "30",
                "start": 203,
                "text": "+"
            },
            {
                "depth": 5,
                "end": 222,
                "id": "31",
                "start": 203,
                "text": "\"The factorial of \""
            },
            {
                "depth": 5,
                "end": 226,
                "id": "32",
                "start": 225,
                "text": "n"
            },
            {
                "depth": 4,
                "end": 235,
                "id": "33",
                "start": 229,
                "text": "\" is \""
            },
            {
                "depth": 3,
                "end": 244,
                "id": "34",
                "start": 238,
                "text": "answer"
            }
        ]
    });
});

test("For loop test", () => {
    expect(get_tree(new JavaScriptParser().parse(
        "// program to display the sum of n natural numbers\n" +
        "let sum = 0;\n" +
        "const n = 100;\n" +
        "\n" +
        "// looping from i = n to 1\n" +
        "// in each iteration, i is decreased by 1\n" +
        "for(let i = n; i >= 1; i-- ) {\n" +
        "    // adding i to sum in each iteration\n" +
        "    sum += i; // sum = sum + i\n" +
        "}\n" +
        "\n" +
        "console.log('sum:',sum);"
    ), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1"
            },
            {
                "from": "1",
                "id": "1->2",
                "to": "2"
            },
            {
                "from": "2",
                "id": "2->3",
                "to": "3"
            },
            {
                "from": "0",
                "id": "0->4",
                "to": "4"
            },
            {
                "from": "4",
                "id": "4->5",
                "to": "5"
            },
            {
                "from": "5",
                "id": "5->6",
                "to": "6"
            },
            {
                "from": "0",
                "id": "0->7",
                "to": "7"
            },
            {
                "from": "7",
                "id": "7->8",
                "text": "init",
                "to": "8"
            },
            {
                "from": "8",
                "id": "8->9",
                "to": "9"
            },
            {
                "from": "9",
                "id": "9->10",
                "to": "10"
            },
            {
                "from": "7",
                "id": "7->11",
                "text": "condition",
                "to": "11"
            },
            {
                "from": "11",
                "id": "11->12",
                "to": "12"
            },
            {
                "from": "11",
                "id": "11->13",
                "to": "13"
            },
            {
                "from": "7",
                "id": "7->14",
                "text": "update",
                "to": "14"
            },
            {
                "from": "7",
                "id": "7->15",
                "text": "body",
                "to": "15"
            },
            {
                "from": "15",
                "id": "15->16",
                "to": "16"
            },
            {
                "from": "0",
                "id": "0->17",
                "to": "17"
            },
            {
                "from": "17",
                "id": "17->18",
                "text": "arg 1",
                "to": "18"
            },
            {
                "from": "17",
                "id": "17->19",
                "text": "arg 2",
                "to": "19"
            }
        ],
        "nodes": [
            {
                "depth": 0,
                "end": 279,
                "id": "0",
                "start": 0,
                "text": "Program"
            },
            {
                "depth": 1,
                "end": 63,
                "id": "1",
                "start": 51,
                "text": "let"
            },
            {
                "depth": 2,
                "end": 62,
                "id": "2",
                "start": 55,
                "text": "sum="
            },
            {
                "depth": 3,
                "end": 62,
                "id": "3",
                "start": 61,
                "text": "0"
            },
            {
                "depth": 1,
                "end": 78,
                "id": "4",
                "start": 64,
                "text": "const"
            },
            {
                "depth": 2,
                "end": 77,
                "id": "5",
                "start": 70,
                "text": "n="
            },
            {
                "depth": 3,
                "end": 77,
                "id": "6",
                "start": 74,
                "text": "100"
            },
            {
                "depth": 1,
                "end": 253,
                "id": "7",
                "start": 149,
                "text": "for"
            },
            {
                "depth": 2,
                "end": 162,
                "id": "8",
                "start": 153,
                "text": "let"
            },
            {
                "depth": 3,
                "end": 162,
                "id": "9",
                "start": 157,
                "text": "i="
            },
            {
                "depth": 4,
                "end": 162,
                "id": "10",
                "start": 161,
                "text": "n"
            },
            {
                "depth": 2,
                "end": 170,
                "id": "11",
                "start": 164,
                "text": ">="
            },
            {
                "depth": 3,
                "end": 165,
                "id": "12",
                "start": 164,
                "text": "i"
            },
            {
                "depth": 3,
                "end": 170,
                "id": "13",
                "start": 169,
                "text": "1"
            },
            {
                "depth": 2,
                "end": 175,
                "id": "14",
                "start": 172,
                "text": "i--"
            },
            {
                "depth": 2,
                "end": 233,
                "id": "15",
                "start": 225,
                "text": "sum+="
            },
            {
                "depth": 3,
                "end": 233,
                "id": "16",
                "start": 232,
                "text": "i"
            },
            {
                "depth": 1,
                "end": 278,
                "id": "17",
                "start": 255,
                "text": "call console.log"
            },
            {
                "depth": 2,
                "end": 273,
                "id": "18",
                "start": 267,
                "text": "\"sum:\""
            },
            {
                "depth": 2,
                "end": 277,
                "id": "19",
                "start": 274,
                "text": "sum"
            }
        ]
    });
});

test("While loop test", () => {
    expect(get_tree(new JavaScriptParser().parse(
        "while (basket.space_left > 0)\n" +
        "  {\n" +
        "    let banana = shop.buy(\"banana\");\n" +
        "    if (basket.can_add(banana))\n" +
        "      basket.add(banana);\n" +
        "    else\n" +
        "      break;\n" +
        "  }"
    ), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1"
            },
            {
                "from": "1",
                "id": "1->2",
                "text": "condition",
                "to": "2"
            },
            {
                "from": "2",
                "id": "2->3",
                "to": "3"
            },
            {
                "from": "2",
                "id": "2->4",
                "to": "4"
            },
            {
                "from": "1",
                "id": "1->5",
                "text": "body",
                "to": "5"
            },
            {
                "from": "5",
                "id": "5->6",
                "to": "6"
            },
            {
                "from": "6",
                "id": "6->7",
                "to": "7"
            },
            {
                "from": "7",
                "id": "7->8",
                "text": "arg 1",
                "to": "8"
            },
            {
                "from": "1",
                "id": "1->9",
                "text": "body",
                "to": "9"
            },
            {
                "from": "9",
                "id": "9->10",
                "text": "condition",
                "to": "10"
            },
            {
                "from": "10",
                "id": "10->11",
                "text": "arg 1",
                "to": "11"
            },
            {
                "from": "9",
                "id": "9->12",
                "text": "body",
                "to": "12"
            },
            {
                "from": "12",
                "id": "12->13",
                "text": "arg 1",
                "to": "13"
            },
            {
                "from": "9",
                "id": "9->14",
                "to": "14"
            },
            {
                "from": "14",
                "id": "14->15",
                "to": "15"
            }
        ],
        "nodes": [
            {
                "depth": 0,
                "end": 154,
                "id": "0",
                "start": 0,
                "text": "Program"
            },
            {
                "depth": 1,
                "end": 154,
                "id": "1",
                "start": 0,
                "text": "while"
            },
            {
                "depth": 2,
                "end": 28,
                "id": "2",
                "start": 7,
                "text": ">"
            },
            {
                "depth": 3,
                "end": 24,
                "id": "3",
                "start": 7,
                "text": "basket.space_left"
            },
            {
                "depth": 3,
                "end": 28,
                "id": "4",
                "start": 27,
                "text": "0"
            },
            {
                "depth": 2,
                "end": 70,
                "id": "5",
                "start": 38,
                "text": "let"
            },
            {
                "depth": 3,
                "end": 69,
                "id": "6",
                "start": 42,
                "text": "banana="
            },
            {
                "depth": 4,
                "end": 69,
                "id": "7",
                "start": 51,
                "text": "call shop.buy"
            },
            {
                "depth": 5,
                "end": 68,
                "id": "8",
                "start": 60,
                "text": "\"banana\""
            },
            {
                "depth": 2,
                "end": 150,
                "id": "9",
                "start": 75,
                "text": "if"
            },
            {
                "depth": 3,
                "end": 101,
                "id": "10",
                "start": 79,
                "text": "call basket.can_add"
            },
            {
                "depth": 4,
                "end": 100,
                "id": "11",
                "start": 94,
                "text": "banana"
            },
            {
                "depth": 3,
                "end": 127,
                "id": "12",
                "start": 109,
                "text": "call basket.add"
            },
            {
                "depth": 4,
                "end": 126,
                "id": "13",
                "start": 120,
                "text": "banana"
            },
            {
                "depth": 2,
                "end": 150,
                "id": "14",
                "start": 144,
                "text": "else"
            },
            {
                "depth": 3,
                "end": 150,
                "id": "15",
                "start": 144,
                "text": "BreakStatement"
            }
        ]
    });
});

test("Simple loops and update expression test", () => {
    expect(get_tree(new JavaScriptParser().parse(
        "for (let i = 0; i < 10; i++)\n" +
        "  cnsole.log(i);\n" +
        "\n" +
        "let i = 0;\n" +
        "while (i < 10)\n" +
        "  console.log(i++);\n" +
        "\n" +
        "test.value++;"
    ), [], [])).toStrictEqual({
        "edges": [
            {
                "from": "0",
                "id": "0->1",
                "to": "1"
            },
            {
                "from": "1",
                "id": "1->2",
                "text": "init",
                "to": "2"
            },
            {
                "from": "2",
                "id": "2->3",
                "to": "3"
            },
            {
                "from": "3",
                "id": "3->4",
                "to": "4"
            },
            {
                "from": "1",
                "id": "1->5",
                "text": "condition",
                "to": "5"
            },
            {
                "from": "5",
                "id": "5->6",
                "to": "6"
            },
            {
                "from": "5",
                "id": "5->7",
                "to": "7"
            },
            {
                "from": "1",
                "id": "1->8",
                "text": "update",
                "to": "8"
            },
            {
                "from": "1",
                "id": "1->9",
                "text": "body",
                "to": "9"
            },
            {
                "from": "9",
                "id": "9->10",
                "text": "arg 1",
                "to": "10"
            },
            {
                "from": "0",
                "id": "0->11",
                "to": "11"
            },
            {
                "from": "11",
                "id": "11->12",
                "to": "12"
            },
            {
                "from": "12",
                "id": "12->13",
                "to": "13"
            },
            {
                "from": "0",
                "id": "0->14",
                "to": "14"
            },
            {
                "from": "14",
                "id": "14->15",
                "text": "condition",
                "to": "15"
            },
            {
                "from": "15",
                "id": "15->16",
                "to": "16"
            },
            {
                "from": "15",
                "id": "15->17",
                "to": "17"
            },
            {
                "from": "14",
                "id": "14->18",
                "text": "body",
                "to": "18"
            },
            {
                "from": "18",
                "id": "18->19",
                "text": "arg 1",
                "to": "19"
            },
            {
                "from": "0",
                "id": "0->20",
                "to": "20"
            },
            {
                "from": "20",
                "id": "20->21",
                "to": "21"
            }
        ],
        "nodes": [
            {
                "depth": 0,
                "end": 107,
                "id": "0",
                "start": 0,
                "text": "Program"
            },
            {
                "depth": 1,
                "end": 45,
                "id": "1",
                "start": 0,
                "text": "for"
            },
            {
                "depth": 2,
                "end": 14,
                "id": "2",
                "start": 5,
                "text": "let"
            },
            {
                "depth": 3,
                "end": 14,
                "id": "3",
                "start": 9,
                "text": "i="
            },
            {
                "depth": 4,
                "end": 14,
                "id": "4",
                "start": 13,
                "text": "0"
            },
            {
                "depth": 2,
                "end": 22,
                "id": "5",
                "start": 16,
                "text": "<"
            },
            {
                "depth": 3,
                "end": 17,
                "id": "6",
                "start": 16,
                "text": "i"
            },
            {
                "depth": 3,
                "end": 22,
                "id": "7",
                "start": 20,
                "text": "10"
            },
            {
                "depth": 2,
                "end": 27,
                "id": "8",
                "start": 24,
                "text": "i++"
            },
            {
                "depth": 2,
                "end": 44,
                "id": "9",
                "start": 31,
                "text": "call cnsole.log"
            },
            {
                "depth": 3,
                "end": 43,
                "id": "10",
                "start": 42,
                "text": "i"
            },
            {
                "depth": 1,
                "end": 57,
                "id": "11",
                "start": 47,
                "text": "let"
            },
            {
                "depth": 2,
                "end": 56,
                "id": "12",
                "start": 51,
                "text": "i="
            },
            {
                "depth": 3,
                "end": 56,
                "id": "13",
                "start": 55,
                "text": "0"
            },
            {
                "depth": 1,
                "end": 92,
                "id": "14",
                "start": 58,
                "text": "while"
            },
            {
                "depth": 2,
                "end": 71,
                "id": "15",
                "start": 65,
                "text": "<"
            },
            {
                "depth": 3,
                "end": 66,
                "id": "16",
                "start": 65,
                "text": "i"
            },
            {
                "depth": 3,
                "end": 71,
                "id": "17",
                "start": 69,
                "text": "10"
            },
            {
                "depth": 2,
                "end": 91,
                "id": "18",
                "start": 75,
                "text": "call console.log"
            },
            {
                "depth": 3,
                "end": 90,
                "id": "19",
                "start": 87,
                "text": "i++"
            },
            {
                "depth": 1,
                "end": 106,
                "id": "20",
                "start": 94,
                "text": "...++"
            },
            {
                "depth": 2,
                "end": 104,
                "id": "21",
                "start": 94,
                "text": "test.value"
            }
        ]
    });
});
