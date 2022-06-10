import React, {Component} from 'react';
import {EditorState} from "@codemirror/state"
import {EditorView} from "codemirror"
import {defaultKeymap} from "@codemirror/commands"
import {
    drawSelection,
    dropCursor,
    highlightActiveLine, highlightSpecialChars,
    keymap,
    lineNumbers,
    placeholder
} from "@codemirror/view";
import {JavaScriptParser} from "../../parser/JavaScriptParser";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asd: null
        };
        this.jsParser = new JavaScriptParser();
    }

    async componentDidMount() {
        this.setState({});
        let startState = EditorState.create({
            extensions: [
                placeholder("// put your code here"),
                lineNumbers(),
                dropCursor(),
                drawSelection(),
                highlightSpecialChars(),
                highlightActiveLine(),
                keymap.of(defaultKeymap),
                EditorView.theme({
                    "&.cm-focused": {
                        outline: "0px !important"
                    }
                })
            ]
        })

        let view = new EditorView({
            state: startState,
            parent: document.getElementById("editor"),
            mode: "javascript"
        })


    }


    render() {
        let c = this.jsParser.parse("1+1");
        return (
            <div className="app">
                <div className="row m-0" style={{padding: '30px', boxSizing: 'border-box'}}>
                    <div className="col" style={{minHeight: '90vh', border: '1px solid'}}>
                        <div id="editor"></div>
                    </div>
                    <div className="col" style={{minHeight: '90vh', border: '1px solid'}}>
                        <pre>
                            {JSON.stringify(c, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}
