import React from 'react'

import { useLocation, useHistory, Route, Link, useRouteMatch,
    useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Button } from 'react-bootstrap'
import TablesList from './TablesList';
import TableMetadataForm from './TableMetadataForm';

export const TablesPage = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables'

    console.log('TablePage:', useRouteMatch(), useParams());

    const [state, setState] = React.useState<any>({
        title: '',
        tableName: '',
        section: '',
        sectionItem: ''
    })

    React.useEffect(() => {
        var _url: string | string[] = url;
        if (url.startsWith('/'))
            _url = url.substring(1)
        _url = _url.split('/')

        var tableName = _url[2]
        var section = _url[3];
        var sectionItem = _url[4];
        var title = 'All Tables'
        // console.log(url, tableName, section, sectionItem)

        if (tableName === '') {
            title = 'All Tables'
        } else if (tableName == 'new-table') {
            title = 'Create New Table'
        }
        else {
            title = 'Edit ' + tableName + ' table'
        }
        setState((prev: any) => {
            return { ...prev, tableName, title, section, sectionItem }
        })
    }, [url])

    return (<React.Fragment>
        <h5>
            {state.title}
        </h5>
        <br />
        <Route exact path={urlPrefix}>
            <TablesList />
        </Route>
        <Route path={urlPrefix + "/:tableName"} component={() => {

            return (<React.Fragment>
                <TableMetadataForm 
                isNewTable={state.tableName === 'new-table'} 
                tableName={state.tableName}
                section={state.section}
                sectionItem={state.sectionItem}
                ></TableMetadataForm>
            </React.Fragment>)
        }} >

        </Route>
    </React.Fragment>)
}

export default TablesPage