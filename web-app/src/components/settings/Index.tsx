import React from 'react'

import { Row, Col, ListGroup } from 'react-bootstrap'

export const Index = (props: any) => {
    return (<React.Fragment>
        <Row style={{ height: '100%' }}>
            <Col style={{ backgroundColor: 'white' }} sm={2}>
                <ListGroup>
                    <ListGroup.Item>Tables</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col sm={10}>
                <h3>Settings Page</h3>
            </Col>
        </Row>
    </React.Fragment>)
}

export default Index