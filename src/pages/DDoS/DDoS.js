import React, {Component} from "react"
import {readyServerCodes} from "./serverConsole"
import {Button, Col, Divider, Row} from "antd"
import {highlight} from "../../utils/utils"


class DDoS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            timeId: 0,
            logs: []
        }
    }

    componentDidMount() {
        highlight()
    }

    startAttack = () => {
        const timeId = setInterval(() => {
                this.addLogs()
        }, 1000)
        this.setState({ timeId, isOpen: true })
    }

    stopAttack = () => {
        window.clearInterval(this.state.timeId)
        this.setState({ isOpen: false })
    }

    getRandomByte = () => {
        return Math.round(Math.random()*256)
    }

    getRandomPort = () => {
        return Math.round(Math.random()*50000) + 3000
    }

    getRandomIp = () => {
        var ip = this.getRandomByte() +'.' +
            this.getRandomByte() +'.' +
            this.getRandomByte() +'.' +
            this.getRandomByte()
        return ip
    }

    addLogs = () => {
        const {logs} = this.state
        const serverConsole = `tcp    0    0    111.22.33.4:80    ${this.getRandomIp()}:${this.getRandomPort()}\t\tSYN_RECV`
        const fin = serverConsole.padEnd(40)
        this.setState({
            logs: [ ...logs, fin]
        })
    }

    render() {
        const {logs, isOpen} = this.state
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Server Module(DDos attack)</h1>
                <Row gutter={16} type="flex" justify="center">
                    {/*Left*/}
                    <Col span={8}>
                        <Divider>Frontend</Divider>
                        <h3>Press the button to start DDos attack</h3>
                        <Button disabled={isOpen} onClick={this.startAttack} type="primary" block>
                            Start DDos Attack
                        </Button>
                        <Divider/>
                        <Button onClick={this.stopAttack} type="danger" block>
                            Stop DDos Attack
                        </Button>
                    </Col>
                    {/*Right*/}
                    <Col span={12}>
                        <Divider>Backend: Server Console</Divider>
                        <pre>
                        <code className="server">
                            {readyServerCodes}
                            {logs.map(log => `\n${log}`)}
                        </code>
                    </pre>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DDoS
