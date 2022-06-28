import React, {Component} from 'react';
import {EditorState} from "@codemirror/state"
import {basicSetup, EditorView} from "codemirror"
import {defaultKeymap} from "@codemirror/commands"
import {
    drawSelection,
    dropCursor,
    highlightActiveLine,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    placeholder,
    ViewPlugin,
    scrollPastEnd
} from "@codemirror/view";
import {javascript} from "@codemirror/lang-javascript"
import {JavaScriptParser} from "../../parser/JavaScriptParser";
import {get_tree} from "../../tree_builder/tree_builder";
import {get_parallel_array} from "../../array_builder/array_builder";
import {Canvas, Edge, Label, Node} from "reaflow"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {}
        };
        this.jsParser = new JavaScriptParser();
        this.view = null;
    }

    async componentDidMount() {
        let initialCode = undefined
        if (getUrlParameter("code")) {
            initialCode = atob(getUrlParameter("code"));
            this.setState({
                json: this.jsParser.parse(initialCode)
            });
        }
        let startState = EditorState.create({
            doc: initialCode,
            extensions: [
                basicSetup,
                javascript(),
                ViewPlugin.fromClass(class {
                    constructor(view) {
                        this.view = view;
                    }

                    update(update) {
                        if (update.docChanged) {
                            try {
                                let parsed = this.view.home.jsParser.parse(this.view.state.doc.toString());
                                this.view.home.setState({
                                    json: parsed
                                });
                                let base64 = btoa(this.view.state.doc.toString());
                                window.history.pushState({}, "", "?code=" + base64);
                            } catch (e) {
                                this.view.home.setState({
                                    json: {error: "incorrect input"}
                                });
                            }
                        }
                    }
                }),
                placeholder("// put your code here"),
                lineNumbers(),
                dropCursor(),
                drawSelection(),
                highlightSpecialChars(),
                highlightActiveLine(),
                scrollPastEnd(),
                keymap.of(defaultKeymap),
                EditorView.theme({
                    "&.cm-focused": {
                        outline: "0px !important"
                    },

                    "&.cm-editor": {
                        maxHeight: '49vh'
                    }
                })
            ]
        })

        this.view = new EditorView({
            state: startState,
            parent: document.getElementById("editor"),
        })

        this.view.home = this;
    }

    render() {
        let tree = get_tree(this.state.json);
        let array = get_parallel_array(tree);
        console.log(array);
        return (
            <div className="app">
                <div className="row m-0" style={{boxSizing: 'border-box'}}>
                    <div className="app-item col p-0"
                         style={{height: '50vh', maxWidth: '50%', border: '0.3em solid #d9d9d9'}}>
                        <div id="editor"></div>
                    </div>
                    <div className="app-item col"
                         style={{height: '50vh', border: '0.3em solid #d9d9d9', fontSize: "1.6rem", overflow: "auto"}}>
                        <table className="table table-bordered table-hover">
                            {array.length === 0 || array[0][0] === undefined ? (
                                <p></p>
                            ) : (
                                array.map((line) => <tr>
                                    {line.map((cell) => <td>{cell}</td>)}
                                </tr>)
                            )}
                        </table>
                    </div>
                </div>
                <div className="app-item row m-0"
                     style={{boxSizing: 'border-box', height: '50vh', border: '0.3em solid #d9d9d9'}}>
                    <Canvas
                        layoutOptions={{
                            'elk.algorithm': 'org.eclipse.elk.layered',
                            'elk.layered.spacing.edgeNodeBetweenLayers': '20',
                            "elk.core.zoomToFit": 'true',
                            'spacing.nodeNodeBetweenLayers': '20'
                        }}
                        maxWidth={2500}
                        maxHeight={1600}
                        maxZoom={0.7}
                        minZoom={-0.7}
                        nodes={tree.nodes}
                        edges={tree.edges}
                        readonly={true}
                        animated={false}
                        fit={true}
                        node={<Node
                            style={{fill: "white"}}
                            label={<Label
                                style={{fill: "black"}}

                            />}
                        />}
                        edge={<Edge
                            label={<Label
                                style={{fill: "black"}}
                            />}
                        />}
                    />

                </div>
            </div>
        );
    }
}

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
    return undefined;
};
