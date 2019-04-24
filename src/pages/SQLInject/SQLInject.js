import React, {Component} from 'react'
import {Col, Divider, Input, Row, Table} from 'antd'
import {columns, db} from "./db"
import {readySqlCodes} from "./codes"
import hljs from 'highlight.js'
import './styles.css'
import 'highlight.js/styles/atom-one-dark.css'

const Search = Input.Search

class SQLInject extends Component {
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

    addLogs = (keyword) => {
        const {logs} = this.state
        const sql = `
select * from user where user_name = '${keyword}'`
        this.setState({
            logs: [ ...logs, sql]
        })
    }

    render() {
        const {logs} = this.state
        return (
          <div>
              <h1 style={{textAlign: 'center'}}>User Module (SQL Inject Attack)</h1>
              <Row gutter={16} type="flex" justify="center">
                  {/*Left*/}
                  <Col span={8}>
                      <Divider>Frontend</Divider>
                      <p>Try following keyword to break the database</p>
                      <ul>
                          <li>'; drop database 'user</li>
                          <li>'; delete user where '1' = '1</li>
                      </ul>
                      <Search
                        placeholder="Enter user name"
                        onSearch={this.onAttackSearch}
                        enterButton
                      />
                  </Col>
                  {/*Right*/}
                  <Col span={8}>
                      <Divider>Backend: 'user' Database</Divider>
                      <Table dataSource={db} columns={columns}/>
                      <Divider>SQL Logger</Divider>
                      <pre>
                        <code className="sql">
                            {readySqlCodes}
                            {logs.map(log => `\n${log}`)}
                        </code>
                    </pre>
                  </Col>
              </Row>
          </div>
        )
    }
}

export default SQLInject
