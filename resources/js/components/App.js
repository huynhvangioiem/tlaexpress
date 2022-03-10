import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import 'antd/dist/antd.css';

export default class App extends Component {
    render() {
        return (
                <div>
                    Hello
                </div>
        );
    }
}

ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>, document.getElementById('app'));
