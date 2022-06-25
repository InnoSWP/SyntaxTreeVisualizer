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
        let startState = EditorState.create({
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

                    "cm-editor": {
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
                    <div className="col" style={{height: '50vh', maxWidth: '50%', border: '0.3em solid #d9d9d9', overflow: 'auto'}}>
                        <div id="editor"></div>
                    </div>
                    <div className="col" style={{height: '50vh', border: '0.3em solid #d9d9d9'}}>
                        <p>here will be array</p>
                    </div>
                </div>
                <div className="row m-0" style={{boxSizing: 'border-box', height: '50vh', border: '0.3em solid #d9d9d9'}}>
                        <Canvas
                            layoutOptions={{
                                'elk.algorithm': 'org.eclipse.elk.layered',
                                'elk.layered.spacing.edgeNodeBetweenLayers': '20',
                                "elk.core.zoomToFit": 'true',
                                'spacing.nodeNodeBetweenLayers': '20'
                            }}
                            maxWidth={800}
                            maxHeight={650}
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
