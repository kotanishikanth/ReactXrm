import React from 'react'


import { useLocation, useHistory , Route, Link } from 'react-router-dom';
import { FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { UseMetadataServices } from '../../../contexts/database-context';

export const TableView = (props: any) => {
    const history = useHistory();
    const url = useLocation().pathname;
    const urlPrefix = '/settings/tables/'

    const { GetTableList } = UseMetadataServices()
    const tableList = GetTableList()

    const [state, setState] = React.useState<any>({
        selectedItem: null
    })

    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev }
        })
    }, [props])

    return (<React.Fragment>
        <div style={{ alignItems: 'left' }}>
            <Button variant="outline-secondary" onClick={() => history.push(urlPrefix + 'new-table')}>Create New Table</Button>{' '}
            <Button variant="outline-secondary" disabled={state.selectedItem === null} onClick={() => history.push(urlPrefix + state.selectedItem)}>Edit Table</Button>{' '}
            
        </div>
        <br />

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
                        onClick={() => setState((prev: any) => { return { ...prev, selectedItem: (prev.selectedItem === x.tableName ? null : x.tableName) } })}
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

export default TableView