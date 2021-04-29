import React from 'react'
import { Form, FormControl, InputGroup, Table } from 'react-bootstrap';

import {
    useLocation, useHistory, Route, Link, useRouteMatch,
    useParams
} from 'react-router-dom';
import { ColumnMetadataType, EmptyColumnMetadataType, UseMetadataServices } from '../../../contexts/database-context';
import MenuBar, { MenuBarItem, MenuBarItemCollection } from '../../common/MenuBar';


type TableFormEditorStateType = {
    isModified: boolean,
    isNewColumn: boolean,
    menuBarButtons: MenuBarItemCollection

}

export const TableFormEditor = (props: any) => {

    const history = useHistory();
    const urlPrefix = '/settings/tables/'
    const { tableName, columnName } = (useParams() as any)
    const { GetColumn, GetColumnList, GetTableList } = UseMetadataServices();
    const tableList = GetTableList();

    const [state, setState] = React.useState<TableFormEditorStateType>({
        isNewColumn: columnName === 'new-form',
        menuBarButtons: {
            "close": {
                label: 'Close',
                onClick: () => history.push(urlPrefix + tableName + "/forms"),
                onRight: true
            }
        },
        isModified: false,
    })

    const onInputChangeHandler = (e: any) => {
        const { name, value } = e.target
        setState((prev: TableFormEditorStateType): TableFormEditorStateType => {
            return {
                ...prev,
                isModified: true
            }
        })
    }

    React.useEffect(() => {
        var isNewColumn = columnName === 'new-form'
        if (isNewColumn) {
            setState((prev: any) => {
                return { ...prev, column:EmptyColumnMetadataType, isNewColumn }
            })
        }else{
            var column = GetColumn(tableName, columnName)
            setState((prev: any) => {
                return { ...prev, column, isNewColumn }
            })
        }
    }, [tableName, columnName])

    return (<React.Fragment>
        <MenuBar items={state.menuBarButtons} >
            <MenuBarItem
                variant="primary"
                hidden={!state.isNewColumn}
                disabled={!state.isModified}
                onClick={() => {
                }}>Add View</MenuBarItem>

            <MenuBarItem
                hidden={state.isNewColumn}
                disabled={!state.isModified}
                onClick={() => {
                }}>Update</MenuBarItem>

            <MenuBarItem
                disabled={state.isNewColumn}
                onClick={() => null}>Delete</MenuBarItem>
        </MenuBar>

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
                    onChange={onInputChangeHandler}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Column Type</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" custom
                    name="columnType"
                    onChange={onInputChangeHandler}
                >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option disabled={!state.isNewColumn} value="lookup">LookUp</option>
                    <option value="datetime">DateTime</option>
                </Form.Control>
            </InputGroup>


        </Form>

    </React.Fragment>)
}

export default TableFormEditor