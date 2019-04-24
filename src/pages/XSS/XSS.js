import React, {Component} from 'react'
import {Row, Col, Divider, Table, Input} from "antd"
import {db, columns} from './db'
import {alertCode, outsideCode, stealCookie} from "./codes"

const Search = Input.Search

class XSS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            db
        }
    }

    onAddReview = (review) => {
        const {db} = this.state
        this.setState({
            db: [...db, {
                key: db.length + 1,
                id: db.length + 1,
                content: review
            }]
        })
    }

    render() {
        const {db} = this.state
        console.log(db)
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Review Module (XSS Attack)</h1>
                <Row gutter={16} type="flex" justify="center">
                    {/*Left*/}
                    <Col span={8}>
                        <Divider>Frontend</Divider>
                        <p>Try following keyword to break the frontend</p>
                        <ul>
                            <li>{alertCode}</li>
                            <li>{outsideCode}</li>
                            <li>{stealCookie}</li>
                        </ul>

                        <Search
                            placeholder="Enter a movie review"
                            onSearch={this.onAddReview}
                            enterButton="Add Review"
                        />
                    </Col>
                    {/*Right*/}
                    <Col span={8}>
                        <Divider>Backend: 'review' Database</Divider>
                        <Table dataSource={db} columns={columns}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default XSS
