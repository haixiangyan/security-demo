import React, {Component} from 'react'
import { Input, Row, Col, Divider, Table } from 'antd';
import { db, columns } from "../db/xssDB"

const Search = Input.Search;

class XSS extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row gutter={16} type="flex" justify="center" className="XSS">
                <Col span={8}>
                    <Divider>Search boxes</Divider>
                    <p>Search box without detecting XSS attack</p>
                    <Search
                        placeholder="Enter name or age to search (Not detect XSS attack)"
                        onSearch={value => console.log(value)}
                        enterButton
                    />
                    <p>Search box with detecting XSS attack</p>
                    <Search
                        placeholder="Enter name or age to search (Detect XSS attack)"
                        onSearch={value => console.log(value)}
                        enterButton
                    />
                    <Divider>Database</Divider>
                    <Table dataSource={db} columns={columns} />
                </Col>
                <Col span={8}>
                    Program
                </Col>
            </Row>
        )
    }
}

export default XSS
