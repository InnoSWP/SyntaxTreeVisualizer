import React, {Component} from 'react';
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
    }


    render() {
        let c = this.jsParser.parse("1+1");
        return (
            <div className="app">
                <h1>Base</h1>
                <pre>
                    {JSON.stringify(c, null, 2)}
                </pre>
            </div>
        );
    }
}
