import React, {Component} from 'react'
import {Col, Divider, Input, Row, Table} from "antd"
import {columns, db} from './db'
import {alertCode, outsideCode, stealCookie} from "./codes"
import {highlight} from "../../utils/utils"

const Search = Input.Search

class XSS extends Component {
    constructor(props) {
        super(props)
        this.state = { db }
    }

    componentDidMount() {
        this.updateReviewList()
        highlight()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateReviewList()
        highlight()
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

    updateReviewList = () => {
        const {db} = this.state
        const reviewList = document.querySelector('#review-list')
        reviewList.innerHTML = ''

        db.forEach(reviewItem => {
            const liItem = document.createElement('li')
            liItem.innerHTML = reviewItem.content

            reviewList.appendChild(liItem)
        })
    }

    getFrontendCodes = () => {
        let html = `<ul>\n`
        this.state.db.forEach(reviewItem => html += `    <li>${reviewItem.content}</li>\n`)
        html += '</ul>'
        return html
    }

    render() {
        const {db} = this.state
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Review Module (XSS Attack)</h1>
                <Row gutter={16} type="flex" justify="center">
                    {/*Left*/}
                    <Col span={8}>
                        <Divider>Frontend</Divider>
                        <h3>Review List</h3>
                        {/*Add review input*/}
                        <Search
                            placeholder="Enter a movie review"
                            onSearch={this.onAddReview}
                            enterButton="Add Review"
                        />

                        {/*Review list*/}
                        <ul id="review-list"/>

                        <Divider>Frontend Codes</Divider>
                        <pre>
                            <code className="html">
                                {this.getFrontendCodes()}
                            </code>
                        </pre>

                        <Divider>Tips</Divider>
                        <p>Try following keyword to break the frontend</p>
                        <ul>
                            <li>{alertCode}</li>
                            <li>{outsideCode}</li>
                            <li>{stealCookie}</li>
                        </ul>
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
