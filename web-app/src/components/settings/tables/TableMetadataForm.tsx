import React from 'react'

import { useLocation, useHistory, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import { Tabs, Tab, Form, FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ColumnMetadataType, TableMetadataType, UseMetadataServices } from '../../../contexts/database-context';


type TableMetadataFormStateType = {
    table: TableMetadataType,
    isModified: boolean,
    isNewTable: boolean
}

const EmptyTableMetadataType = { tableName: '', displayName: '', primaryColumnName: '', columns: {} }

export const TableMetadataForm = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables/'

    console.log('TableMetadataForm:', useRouteMatch(), useParams());

    const [state, setState] = React.useState<TableMetadataFormStateType>({
        table: EmptyTableMetadataType,
        isModified: false,
        isNewTable: props.isNewTable
    })
    const appendState = (s: any) => {
        setState((prev: any): any => { return { ...prev, ...s } })
    }
    const [tab, setTab] = React.useState<string | null>('main');

    const { AddNewTable, UpdateTable, GetTableList, GetTable } = UseMetadataServices()

    const createOrUpdateTableHandler = () => {
        appendState({ isModified: false })  // setState((prev: any):any => { return { ...prev, isModified:false } })
        var tableList = GetTableList()
        debugger;
        if (state.isNewTable && tableList.map(x => x.tableName).includes(state.table.tableName)) {
            appendState({ isModified: true })
            alert('TableAlreadyExists')
        } else if (state.isNewTable) {
            AddNewTable({ tableName: state.table.tableName, displayName: state.table.displayName })
            history.push(urlPrefix + state.table.tableName)
        }
        else if (!state.isNewTable) {
            UpdateTable({ tableName: state.table.tableName, displayName: state.table.displayName })
            history.push(urlPrefix + state.table.tableName)
        }
    }

    const onInputChangeHandler = (e: any) => {
        setState((prev: TableMetadataFormStateType): TableMetadataFormStateType => {
            return {
                ...prev, table: { ...prev.table, [e.target['name']]: e.target['value'] }, isModified: true
            }
        })
    }

    React.useEffect(() => {
        setState((prev: TableMetadataFormStateType): TableMetadataFormStateType => {
            var table: TableMetadataType = EmptyTableMetadataType;
            if (!props.isNewTable && prev.table.tableName !== props.tableName) {
                table = GetTable(props.tableName)
            }
            return { ...prev, table }
        })
    }, [props])

    return (<React.Fragment>
        
        <div style={{ alignItems: 'left' }}>
            <Button variant={props.isNewTable ? "outline-primary" : "outline-secondary"}
                disabled={!state.isModified}
                onClick={createOrUpdateTableHandler}
            >{props.isNewTable ? 'Create Table' : 'Update table'}</Button>{' '}
            <Button variant="outline-secondary" style={{ float: 'right' }} onClick={() => history.push(urlPrefix)}>Close</Button>{' '}
        </div>
        <br />

        
        <Tabs
            id="controlled-tab-example"
            activeKey={tab}
            onSelect={(k: string | null) => setTab(k)}
        >
            <Tab eventKey="main" title="Main">
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Table Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="tablename"
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
                            placeholder="display name"
                            name="displayName"
                            aria-label="displayname"
                            aria-describedby="basic-addon1"
                            value={state.table.displayName}
                            onChange={onInputChangeHandler}
                        />
                    </InputGroup>
                </Form>
            </Tab>
            <Tab eventKey="columns" title="Columns" disabled={state.isNewTable}>
                <div style={{ alignItems: 'left' }}>
                    <Button variant={props ? "outline-primary" : "outline-secondary"}
                    >{props ? 'Add New Column' : 'Update table'}</Button>{' '}
                </div>
                <br />
                {
                    Object.values(state.table.columns).map((column: ColumnMetadataType) => {
                        return (
                            <ListGroupItem key={column.columnName}>{column.columnLabel} </ListGroupItem>
                        )
                    })
                }
            </Tab>
            <Tab eventKey="forms" title="Forms">
                <h5>Forms</h5>
            </Tab>
            <Tab eventKey="views" title="Views">
                <h5>Views</h5>
            </Tab>
        </Tabs>
    </React.Fragment>)
}

export default TableMetadataForm