import React from 'react'
import { Form, FormControl, InputGroup, Table } from 'react-bootstrap';

import {
    useLocation, useHistory, Route, Link, useRouteMatch,
    useParams
} from 'react-router-dom';
import { ColumnMetadataType, EmptyColumnMetadataType, UseMetadataServices } from '../../../contexts/database-context';
import MenuBar, { MenuBarItemCollection } from '../../common/MenuBar';


type TableColumnFormStateType = {
    column: ColumnMetadataType,
    isModified: boolean,
    isNewColumn: boolean,
    menuBarButtons: MenuBarItemCollection

}

export const TableColumnForm = (props: any) => {

    const history = useHistory();
    const urlPrefix = '/settings/tables/'
    const { tableName, columnName } = (useParams() as any)
    const { GetColumn, UpsertColumn, GetColumnList, GetTableList } = UseMetadataServices();
    const tableList = GetTableList();

    const [state, setState] = React.useState<TableColumnFormStateType>({
        isNewColumn: columnName === 'new-column',
        menuBarButtons: {
            "add": {
                label: 'Add',
                onClick: () => null
            },
            "update": {
                label: 'Update',
                onClick: () => null
            },
            "delete": {
                label: 'Delete',
                onClick: () => null,
                disabled: (columnName === 'new-column')
            },
            "close": {
                label: 'Close',
                onClick: () => history.push(urlPrefix + tableName + "/columns"),
                onRight: true
            }
        },
        isModified: false,
        column: EmptyColumnMetadataType
    })

    const onInputChangeHandler = (e: any) => {
        const { name, value } = e.target
        setState((prev: TableColumnFormStateType): TableColumnFormStateType => {
            var _column= { ...prev.column, 
                [name]: value 
            }
            return {
                ...prev, column: _column, 
                    isModified: true,
                    menuBarButtons: {
                        ...prev.menuBarButtons,
                        add:{
                            ...prev.menuBarButtons.add,
                            onClick: () => {
                                const c = _column
                                UpsertColumn(tableName, c)
                                history.push(urlPrefix + tableName + "/columns/" + c.columnName)
                            }
                        },
                        update:{
                            ...prev.menuBarButtons.update,
                            onClick: () => {
                                const c = _column
                                UpsertColumn(tableName, c)
                                history.push(urlPrefix + tableName + "/columns/" + c.columnName)
                            }
                        }
                    }
                
            }
        })
    }

    React.useEffect(() => {
        if (!state.isNewColumn) {
            var column = GetColumn(tableName, columnName)
            setState((prev: any) => {
                return { ...prev, column }
            })
        }
    }, [props])

    return (<React.Fragment>
        <MenuBar items={state.menuBarButtons} />

        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Column Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name="columnName"
                    disabled={state.isNewColumn === false}
                    aria-label="tablename"
                    aria-describedby="basic-addon1"
                    value={state.column.columnName}
                    onChange={onInputChangeHandler}
                ></FormControl>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Column Label</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name="columnLabel"
                    aria-label="columnLabel"
                    aria-describedby="basic-addon1"
                    value={state.column.columnLabel}
                    onChange={onInputChangeHandler}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Column Type</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" custom 
                name="columnType"
                value={state.column.columnType}
                onChange={onInputChangeHandler}
                >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option disabled={!state.isNewColumn} value="lookup">LookUp</option>
                    <option value="datetime">DateTime</option>
                </Form.Control>
            </InputGroup>

            {
                state.column.columnType === 'lookup' ?
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Lookup To</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" custom 
                        name="tableRef"
                        disabled={!state.isNewColumn}
                        value={state.column.tableRef}
                        onChange={onInputChangeHandler}
                        >
                            {tableList.map((item: any) => {
                                return <option key={item.tableName} value={item.tableName}>{item.displayName}</option>
                            })}

                        </Form.Control>
                    </InputGroup> : null
            }

        </Form>

    </React.Fragment>)
}

export default TableColumnForm