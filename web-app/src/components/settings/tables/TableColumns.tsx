import React from 'react'
import { Table } from 'react-bootstrap';

import {
    useLocation, useHistory, Route, Link, useRouteMatch,
    useParams
} from 'react-router-dom';
import { UseMetadataServices } from '../../../contexts/database-context';
import MenuBar from '../../common/MenuBar';

export const TableColumns = (props: any) => {

    const history = useHistory();
    const urlPrefix = '/settings/tables/'
    const { tableName } = (useParams() as any)
    const { GetColumnList, GetTableList, GetRelatedTables } = UseMetadataServices();
    const tableList = GetTableList();
    const [state, setState] = React.useState<any>({
        selectedItem: null,
        columns: [],
        relatedTables: GetRelatedTables(tableName),
        menuBarButtons: {
            "add": {
                label: 'Add',
                onClick: () => history.push(urlPrefix + tableName + "/columns/new-column")

            },
            "edit": {
                label: 'Edit',
                onClick: () => history.push(urlPrefix + tableName + "/columns/" + state.selectedItem)

            },
            "delete": {
                label: 'Delete',
                onClick: () => null

            },
            "close": {
                label: 'Close',
                onClick: () => history.push(urlPrefix + tableName),
                onRight: true
            }
        }
    })

    const setSelectedItem = (columnName: string) => {
        setState((prev: any) => {
            return {
                ...prev,
                selectedItem: (prev.selectedItem === columnName ? null : columnName),
                menuBarButtons: {
                    ...prev.menuBarButtons,
                    edit: { ...prev.menuBarButtons.edit, onClick: () => history.push(urlPrefix + tableName + "/columns/" + columnName), disabled: (prev.selectedItem === columnName) }
                }
            }
        })
    }

    React.useEffect(() => {
        var columns = GetColumnList(tableName)
        setState((prev: any) => {
            return { ...prev, columns }
        })
    }, [])

    return (<React.Fragment>
        <MenuBar items={state.menuBarButtons} />

        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Column Name</th>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Lookup Table</th>
                </tr>
            </thead>
            <tbody>
                {state.columns.map((x: any, index: any) => {
                    return <tr key={x.columnName}
                        style={{ background: (state.selectedItem === x.columnName ? "lightgrey" : "") }}
                        onClick={() => setSelectedItem(x.columnName)}
                    >
                        <td>{index + 1}</td>
                        <td>{x.columnName}</td>
                        <td>{x.columnLabel}</td>
                        <td>{x.columnType}</td>
                        <td>{x.tableRef ?
                            <Link to={"/settings/tables/" + x.tableRef}>{tableList.filter((t: any) => t.tableName === x.tableRef)[0]?.displayName || x.tableRef}</Link>
                            : null
                        }</td>
                    </tr>
                })}


            </tbody>
        </Table>

        <br/>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Table Name</th>
                    <th>Column Name</th>
                </tr>
            </thead>
            <tbody>
                {state.relatedTables.map((x: any, index: any) => {
                    return <tr key={x.columnName}
                        style={{ background: (state.selectedItem === x.columnName ? "lightgrey" : "") }}
                        onClick={() => setSelectedItem(x.columnName)}
                    >
                        <td>{index + 1}</td>
                        <td>{x.tableName ?
                            <Link to={"/settings/tables/" + x.tableName}>{tableList.filter((t: any) => t.tableName === x.tableName)[0]?.displayName || x.tableName}</Link>
                            : null
                        }</td>
                        <td>{x.columnName}</td>
                    </tr>
                })}


            </tbody>
        </Table>


    </React.Fragment>)
}

export default TableColumns