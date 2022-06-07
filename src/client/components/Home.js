import React, {Component} from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asd: null
        };
    }

    async componentDidMount() {
        this.setState({});
    }


    render() {
        return (
            <div className="app">
                <h1>Base</h1>
            </div>
        );
    }
}
