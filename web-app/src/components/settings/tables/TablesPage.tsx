import React from 'react'

import {
    useLocation, useHistory, Route, Link, useRouteMatch,
    useParams,
    Switch
} from 'react-router-dom';
import TablesList from './TablesList';
import TableMetadataForm from './TableMetadataForm';
import TableColumns from './TableColumns';
import TableColumnForm from './TableColumnForm';
import { Breadcrumb } from 'react-bootstrap';

export const TablesPage = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables' // useRouteMatch

    console.log('TablePage:', useRouteMatch(), useParams());

    const [state, setState] = React.useState<any>({
        title: '',
        tableName: '',
        section: '',
        sectionItem: ''
    })

    React.useEffect(() => {

    }, [url])

    var subUrl:string = '/#/settings'
    return (<React.Fragment>
        <Breadcrumb>
        {
            url.replace('/settings/','').split('/').map((x:string, i:number)=>{
                subUrl += '/'+ x;
                return <Breadcrumb.Item href={subUrl} key={i}>{x}</Breadcrumb.Item>
            })
        }            
        </Breadcrumb>
        <Switch>
            <Route path={urlPrefix + "/:tableName/columns/:columnName"}>
                <TableColumnForm />
            </Route>
            <Route path={urlPrefix + "/:tableName/columns"}>
                <TableColumns />
            </Route>
            <Route path={urlPrefix + "/:tableName/forms/:formName"}>
                <h2>Form displayed here</h2>
            </Route>
            <Route path={urlPrefix + "/:tableName/forms"}>
                <h2>All forms displayed here</h2>
            </Route>
            <Route path={urlPrefix + "/:tableName/views/:ViewName"}>
                <h2>view displayed here</h2>
            </Route>
            <Route path={urlPrefix + "/:tableName/views"}>
                <h2>All views displayed here</h2>
            </Route>
            <Route path={urlPrefix + "/:tableName"}>
                <TableMetadataForm />
            </Route>
            <Route exact path={urlPrefix}>
                <TablesList />
            </Route>
        </Switch>

    </React.Fragment >)
}

export default TablesPage