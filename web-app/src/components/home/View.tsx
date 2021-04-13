import React from 'react'
import { useLocation } from 'react-router-dom';

import { Row, Col, ListGroup } from 'react-bootstrap'

export const View = (props: any) => {

    const url = useLocation();  

    return (<React.Fragment>
        <h5>{props.tableName}</h5>
    </React.Fragment>)
}

export default View