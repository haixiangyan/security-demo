import React, {Component} from 'react'
import {Col, Divider, Input, Row, Table} from 'antd'
import {columns, defaultDB} from "./db"
import {readySqlCodes} from "./codes"
import './styles.css'
import {highlight} from "../../utils/utils"

const Search = Input.Search

class SQLInject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: [],
            db: null
        }
    }

    componentDidMount() {
        let db = localStorage.getItem('sqlInjectDB')
        if (!db) {
            db = defaultDB
            localStorage.setItem('sqlInjectDB', JSON.stringify(db))
        }
        this.setState({ db: JSON.parse(db) })
        highlight()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        highlight()
    }

    onAttackSearch = (value) => {
        this.addLogs(value)
    }

    addLogs = (keyword) => {
        const {logs} = this.state
        const sql = `
select * from user where user_name = '${keyword}'`
        // Drop database
        if (keyword.indexOf('drop')) {
            this.setState({
                logs: [ ...logs, sql],
                db: []
            })
        }

        // Normal
        this.setState({
            logs: [ ...logs, sql]
        })
    }

    render() {
        const {logs, db} = this.state
        return (
          <div>
              <h1 style={{textAlign: 'center'}}>User Module (SQL Inject Attack)</h1>
              <Row gutter={16} type="flex" justify="center">
                  {/*Left*/}
                  <Col span={8}>
                      <Divider>Frontend</Divider>
                      <h3>Enter user name for searching user</h3>
                      <Search
                        placeholder="Enter user name"
                        onSearch={this.onAttackSearch}
                        enterButton="Search User"
                      />
                      <Divider>Tips</Divider>
                      <p>Try following keyword to break the database</p>
                      <ul>
                          <li>'; drop database 'user</li>
                          <li>'; delete user where '1' = '1</li>
                      </ul>
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
