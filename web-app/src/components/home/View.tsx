import React from 'react'
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line
import { Row, Col, ListGroup } from 'react-bootstrap'

export const View = (props: any) => {

    // eslint-disable-next-line
    const url = useLocation();  

    return (<React.Fragment>
        <h5>{props.tableName}</h5>
    </React.Fragment>)
}

export default View