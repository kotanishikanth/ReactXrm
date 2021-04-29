import React from 'react'


import { useLocation, useHistory, Route, Link } from 'react-router-dom';
import { FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { UseMetadataServices } from '../../../contexts/database-context';
import { MenuBar, MenuBarItemType, MenuBarItemCollection, MenuBarItem } from '../../common/MenuBar';

export const TablesList = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables/'

    const { GetTableList } = UseMetadataServices()
    const tableList = GetTableList()

    const [state, setState] = React.useState<any>({
        selectedItem: null,
        menuBarButtons: {}
    })

    const BuildMenuBarItems = (selectedItem: string = '', isItemSelected: boolean = false) => {
        var menuBarButtons: MenuBarItemCollection = {
        }
        return menuBarButtons
    }

    const tableClicked = (tableName: string) => {
        setState((prev: any) => {
            return {
                ...prev,
                selectedItem: (prev.selectedItem === tableName ? null : tableName),
            }
        })
    }


    React.useEffect(() => {
        var menuBarButtons = BuildMenuBarItems()
        setState((prev: any) => {
            return { ...prev, menuBarButtons }
        })
    }, [])

    return (<React.Fragment>

        <MenuBar items={state.menuBarButtons} >
            <MenuBarItem
                variant="primary"
                onClick={() => {
                    history.push(urlPrefix + "/new-table")
                }}>Create new Table</MenuBarItem>

            <MenuBarItem
                disabled={state.selectedItem == null}
                onClick={() => {
                    history.push(urlPrefix + state.selectedItem)
                }}>Update Table</MenuBarItem>

            <MenuBarItem
                disabled={state.selectedItem == null}
                onClick={() => null}>Truncate</MenuBarItem>

            <MenuBarItem
                disabled={state.selectedItem == null}
                onClick={() => null}>Delete</MenuBarItem>
        </MenuBar>

        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Table Name</th>
                    <th>Display Name</th>
                </tr>
            </thead>
            <tbody>
                {tableList.map((x: any, index: any) => {
                    return <tr key={x.tableName}
                        style={{ background: (state.selectedItem === x.tableName ? "lightgrey" : "") }}
                        onClick={() => tableClicked(x.tableName)}
                    >
                        <td>{index + 1}</td>
                        <td>{x.tableName}</td>
                        <td>{x.displayName}</td>
                    </tr>
                })}


            </tbody>
        </Table>

    </React.Fragment>)
}

export default TablesList