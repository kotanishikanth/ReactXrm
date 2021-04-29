import React from 'react'

import { useLocation, useHistory, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import { Tabs, Tab, Form, FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ColumnMetadataType, EmptyTableMetadataType, TableMetadataType, UseMetadataServices } from '../../../contexts/database-context';
import MenuBar, { MenuBarItem, MenuBarItemCollection } from '../../common/MenuBar';


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
        menuBarButtons: {}
    })

    const appendState = (s: any) => {
        setState((prev: any): any => { return { ...prev, ...s } })
    }


    const createOrUpdateTableHandler = () => {
        appendState({ isModified: false })  // setState((prev: any):any => { return { ...prev, isModified:false } })
        

        if (state.isNewTable && tableList.map(x => x.tableName).includes(state.table.tableName)) {
            appendState({ isModified: true })
            alert('TableAlreadyExists')
        } else if (state.isNewTable) {
            var newTable = { tableName: state.table.tableName, displayName: state.table.displayName }
            debugger;
            AddNewTable(newTable)
            history.push(urlPrefix + state.table.tableName)
        }
        else if (!state.isNewTable) {
            UpdateTable({ tableName: state.table.tableName, displayName: state.table.displayName })
            history.push(urlPrefix + state.table.tableName)
        }
    }

    var menuBarButtons: MenuBarItemCollection = {
        "createupdate": {
            label: (isNewTable ? 'Create Table' : 'Update table'),
            onClick: createOrUpdateTableHandler,
            style: isNewTable ? "primary" : "secondary",
            disabled: state.isModified
        },
        "columns": {
            label: 'Columns',
            onClick: () => history.push(urlPrefix + tableName + '/columns'),
            style: "secondary",
            disabled: isNewTable
        },
        "forms": {
            label: 'Forms',
            onClick: () => history.push(urlPrefix + tableName + '/forms'),
            style: "secondary",
            disabled: isNewTable
        },
        "views": {
            label: 'Views',
            onClick: () => history.push(urlPrefix + tableName + '/views'),
            style: "secondary",
            disabled: isNewTable
        },
        "close": {
            label: 'Close',
            onClick: () => history.push(urlPrefix),
            onRight: true
        }
    }


    const onInputChangeHandler = (e: any) => {
        const { name, value } = e.target
        setState((prev: TableMetadataFormStateType): TableMetadataFormStateType => {
            return {
                ...prev, table: { ...prev.table, [name]: value }, isModified: true
            }
        })
    }

    React.useEffect(() => {
        setState((prev:any)=>{
            return {
                ...prev,
                menuBarButtons
            }
        })
    }, [])





    return (<React.Fragment>

        <MenuBar items={state.menuBarButtons} />

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