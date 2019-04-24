import React, {Component} from 'react'
import {Row, Col, Input, Divider, Table, Form, Icon, Button} from "antd"
const Search = Input.Search

class CSRF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    onSubmit = () => {

    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Login Module (CSRF Attack)</h1>
                <Row gutter={16} type="flex" justify="center">
                    {/*Left*/}
                    <Col span={8}>
                        <Divider>Frontend</Divider>
                        <h3>Review List</h3>
                        {/*Add review input*/}
                        <Form onSubmit={this.onSubmit} className="login-form">
                            <Form.Item>
                                <Input prefix={<Icon type="user"/>} placeholder="Username" />
                            </Form.Item>
                            <Form.Item>
                                <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>

                        {/*Tips*/}
                        <Divider>Tips</Divider>
                        <p>Try following keyword to break the frontend</p>
                        <ul>
                        </ul>
                    </Col>
                    {/*Right*/}
                    <Col span={8}>
                        <Divider>Backend: 'review' Database</Divider>
                        {/*<Table dataSource={db} columns={columns}/>*/}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CSRF
