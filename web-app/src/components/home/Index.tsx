import React from 'react'
import { useLocation, Route, Link } from 'react-router-dom';

import { Row, Col, ListGroup } from 'react-bootstrap'
import View from './View';

export const Index = (props: any) => {

    const url = useLocation().pathname;

    return (<React.Fragment>
        <Row style={{ height: '100%' }}>
            <Col style={{ backgroundColor: 'white' }} sm={2}>
                <ListGroup>
                    <ListGroup.Item><Link to="/account">Account</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/contact">Contact</Link></ListGroup.Item>
                </ListGroup>
            </Col>
            <Col sm={10}>
                <Route exact path="/home">
                    <h3>HomePage</h3>
                </Route>
                <Route exact path="/:tableName" component={() => {
                    const tableName = url.substring(1)
                    return <React.Fragment>
                        {tableName == 'home' ? null :
                            <View tableName={tableName} />
                        }</React.Fragment>
                }
                }></Route>

            </Col>
        </Row>
    </React.Fragment>)
}

export default Index