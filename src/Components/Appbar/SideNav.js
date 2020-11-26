// import { Tab } from '@material-ui/core'
import React from 'react'
import { Tab, Col, Nav, Row } from 'react-bootstrap'

const SideNav = () => {
    return (
        <div className="sideNav">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={12}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Timer</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Time Sheet  </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Report  </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Team  </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Projects  </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {/* <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Sonnet />
                            <p>Some text here</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Sonnet />
                            <p>Some other text here</p>

                        </Tab.Pane>
                    </Tab.Content>
                </Col> */}
                </Row>
            </Tab.Container>
        </div>

    )
}
export default SideNav