import React, {Component} from 'react'
import {Button, Col, Divider, Form, Icon, Input, notification, Row} from "antd"

class CSRF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    openNotification = () => {
        const key = `open${Date.now()}`
        const btn = (
            <a href="#">http://bank.example/withdraw?account=Bob&amount=1000000&for=Evil</a>
        )
        notification.open({
            message: 'Hacker Message',
            description: 'Click the link below to see something new XD',
            btn,
            key,
        })
    }

    onLogin = () => {
        this.setState({
            isLogin: true
        })

        this.openNotification()
    }

    render() {
        const {isLogin} = this.state
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Login Module (CSRF Attack)</h1>
                <Row gutter={16} type="flex" justify="center">
                    {/*Left*/}
                    <Col span={8}>
                        <Divider>Frontend</Divider>
                        <h3>Review List</h3>
                        {
                            isLogin ?
                                <div>You are logged in</div>
                                :
                                <Form className="login-form">
                                    <Form.Item>
                                        <Input prefix={<Icon type="user"/>} placeholder="Username"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button onClick={this.onLogin} type="primary" block
                                                className="login-form-button">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                        }

                        {/*Tips*/}
                        <Divider>Tips</Divider>
                        <p>Try following keyword to break the frontend</p>
                        <ol>
                            <li>Login with any email and password</li>
                            <li>Click the link that user sends</li>
                            <li>Boom, your account has been stolen 300 bucks</li>
                        </ol>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CSRF
