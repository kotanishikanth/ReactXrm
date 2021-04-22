import React from 'react'

import { useLocation, useHistory , Route, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button } from 'react-bootstrap'
import TableView from './TableView';
import TableForm from './TableForm';

export const TablesPage = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables/'
    const [state, setState] =React.useState<any>({

    })

    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev }
        })
    }, [props])

    return (<React.Fragment>
        
        <Route exact path={ urlPrefix + "/"}>
                    <TableView />
                </Route>
                <Route  path={ urlPrefix + ":tableName"} component={() => {
                    const tableName = url.replace(urlPrefix, '');
                 return (<React.Fragment>
                    <TableForm isNewTable={tableName === 'new-table'} tableName={tableName}></TableForm>
                </React.Fragment>)} } >
                   
                </Route>
    </React.Fragment>)
}

export default TablesPage