import React, {Component} from 'react'
import {Input, Row, Col, Divider, Table} from 'antd'
import {db, columns} from "./db"
import {backendCodes, readySqlCodes} from "./codes"
import hljs from 'highlight.js'
import './styles.css'
import 'highlight.js/styles/atom-one-dark.css'

const Search = Input.Search

class XSS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: []
        }
    }

    componentDidMount() {
        this.highlight()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.highlight()
    }

    highlight = () => {
        const codePads = document.querySelectorAll('pre code')
        codePads.forEach(codePad => hljs.highlightBlock(codePad))
    }

    onAttackSearch = (value) => {
        this.addLogs(value)
    }

    onSafeSearch = (value) => {
        console.log(value)
        this.addLogs(value)
    }

    addLogs = (keyword) => {
        const {logs} = this.state
        const sql = `
# Searching "${keyword}"
select * from user where user_name = '${keyword}'`
        this.setState({
            logs: [ ...logs, sql]
        })
    }

    render() {
        const {logs} = this.state
        console.log(logs)
        return (
            <Row gutter={16} type="flex" justify="center" className="XSS">
                <Col span={8}>
                    <Divider>Search boxes</Divider>
                    <p>Search box without detecting XSS attack</p>
                    <Search
                        placeholder="Enter user name (Not detect XSS attack)"
                        onSearch={this.onAttackSearch}
                        enterButton
                    />
                    <p>Search box with detecting XSS attack</p>
                    <Search
                        placeholder="Enter user name (Detect XSS attack)"
                        onSearch={this.onSafeSearch}
                        enterButton
                    />
                    <Divider>Database: user Table</Divider>
                    <Table dataSource={db} columns={columns}/>
                </Col>
                <Col span={8}>
                    <Divider>Vulnerable Codes</Divider>
                    <pre>
                        <code className="java">
                            {backendCodes}
                        </code>
                    </pre>
                    <Divider>Logger</Divider>
                    <pre>
                        <code className="sql">
                            {readySqlCodes}
                            {logs.map(log => `\n${log}`)}
                        </code>
                    </pre>
                </Col>
            </Row>
        )
    }
}

export default XSS
