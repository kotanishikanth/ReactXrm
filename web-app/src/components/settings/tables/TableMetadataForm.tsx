import React from 'react'

import { useLocation, useHistory, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import { Tabs, Tab, Form, FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ColumnMetadataType, EmptyTableMetadataType, TableMetadataType, UseMetadataServices } from '../../../contexts/database-context';
import MenuBar, { MenuBarItemType, MenuBarItemCollection, MenuBarItem } from '../../common/MenuBar';


type TableMetadataFormStateType = {
    table: TableMetadataType,
    isModified: boolean,
    isNewTable: boolean,
    menuBarButtons: MenuBarItemCollection

}


export const TableMetadataForm = (props: any) => {
    /*
    const url = useLocation().pathname;
    */
    const history = useHistory();
    const urlPrefix = '/settings/tables/'

    const { tableName } = (useParams() as any)
    const isNewTable: boolean = (tableName == "new-table")

    const { AddNewTable, UpdateTable, GetTableList, GetTable } = UseMetadataServices()
    const tableList = GetTableList()
    const [state, setState] = React.useState<TableMetadataFormStateType>({
        table: EmptyTableMetadataType,
        isModified: false,
        isNewTable: tableName === 'new-table',
        menuBarButtons: {
            "close": {
                label: 'Close',
                onClick: () => history.push(urlPrefix),
                onRight: true
            }
        }
    })

    const appendState = (s: any) => {
        setState((prev: any): any => { return { ...prev, ...s } })
    }

    const onInputChangeHandler = (e: any) => {
        const { name, value } = e.target
        setState((prev: TableMetadataFormStateType): TableMetadataFormStateType => {
            var table = { ...prev.table, [name]: value }
            return {
                ...prev, table, isModified: true,
            }
        })
    }

    React.useEffect(() => {
        var isNewTable = tableName === 'new-table'

        setState((prev: any) => {
            return {
                ...prev,
                table: isNewTable ? EmptyTableMetadataType : GetTable(tableName),
                isNewTable: isNewTable,
            }
        })
    }, [tableName])


    return (<React.Fragment>

        <MenuBar items={state.menuBarButtons} >
            <MenuBarItem
                variant="primary"
                hidden={!state.isNewTable}
                disabled={!state.isModified}
                onClick={() => {
                    AddNewTable(state.table)
                    history.push(urlPrefix + state.table.tableName)
                }}>Create</MenuBarItem>

            <MenuBarItem
                hidden={state.isNewTable}
                disabled={!state.isModified}
                onClick={() => {
                    UpdateTable(state.table)
                    history.push(urlPrefix + state.table.tableName)
                }}>Update</MenuBarItem>

            <MenuBarItem
                disabled={state.isNewTable}
                onClick={() => history.push(urlPrefix + tableName + '/columns')}>Columns</MenuBarItem>

            <MenuBarItem
                disabled={state.isNewTable}
                onClick={() => history.push(urlPrefix + tableName + '/forms')}>Forms</MenuBarItem>

            <MenuBarItem
                disabled={state.isNewTable}
                onClick={() => history.push(urlPrefix + tableName + '/views')}>Views</MenuBarItem>
        </MenuBar>

        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Table Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name="tableName"
                    disabled={state.isNewTable === false}
                    aria-label="tablename"
                    aria-describedby="basic-addon1"
                    value={state.table.tableName}
                    onChange={onInputChangeHandler}
                ></FormControl>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Display Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name="displayName"
                    aria-label="displayname"
                    aria-describedby="basic-addon1"
                    value={state.table.displayName}
                    onChange={onInputChangeHandler}
                />
            </InputGroup>
        </Form>

    </React.Fragment>)
}

export default TableMetadataForm