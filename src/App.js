import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom"
import {Menu, SubMenu} from 'antd'
import './App.css'
import XSS from "./pages/XSS"
import CSRF from "./pages/CSRF"
import DDoS from "./pages/DDoS"

class App extends Component {
    state = {
        current: 'xss',
    }

    onChangeMenu = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Router className="App">
                <Menu
                    className="app-menu"
                    onClick={this.onChangeMenu}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="xss">
                        <Link to="/">XSS</Link>
                    </Menu.Item>
                    <Menu.Item key="csrf">
                        <Link to="/csrf">CSRF</Link>
                    </Menu.Item>
                    <Menu.Item key="ddos">
                        <Link to="/ddos">DDoS</Link>
                    </Menu.Item>
                </Menu>
                <div className="app-content">
                    <Route path="/" exact component={XSS}/>
                    <Route path="/xss" component={XSS}/>
                    <Route path="/csrf" component={CSRF}/>
                    <Route path="/ddos" component={DDoS}/>
                </div>
            </Router>
        )
    }
}

export default App
