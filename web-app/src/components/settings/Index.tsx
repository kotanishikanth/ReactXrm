import React from 'react'

import { FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { UseDatabaseCacheMethods, UseMetadataServices } from '../../contexts/database-context'
import FormDesigner from '../common/FormDesigner'

import { useLocation, Route, Link } from 'react-router-dom';
import TablesPage from './tables/TablesPage';

const TableModal = (props: any) => {
    // const { isNewTable, tableName, displayName } = props.data
    //console.log('Modal props', props.data)
    const [state, setState] = React.useState<any>({})

    React.useEffect(() => {
        setState({
            isNewTable: props.data.isNewTable,
            tableName: (props.data.isNewTable ? '' : props.data.tableName),
            displayName: (props.data.isNewTable ? '' : props.data.displayName)
        })
    }, [props.data])

    const parentOnSubmitHandler = props.onSubmit
    const onSubmitHandler = () => {

        parentOnSubmitHandler(state)

    }

    const onInputChangeHandler = (e: any) => {
        setState((prev: any) => {
            return {
                ...prev, [e.target['name']]: e.target['value']
            }
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {state.isNewTable === true ? 'New Table' : 'Updating ' + state.tableName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
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
                        value={state.tableName}
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
                        value={state.displayName}
                        onChange={onInputChangeHandler}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"outline-" + (state.isNewTable === true ? "success" : "primary")}
                    onClick={onSubmitHandler}>
                    {state.isNewTable === true ? 'Add New Table' : 'Update table'}
                </Button>
                <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ColumnModal = (props: any) => {
    // const { isNewTable, tableName, displayName } = props.data
    //console.log('Modal props', props.data)
    const [state, setState] = React.useState<any>({})

    React.useEffect(() => {
        setState({})
    }, [props.data])

    const parentOnSubmitHandler = props.onSubmit
    const onSubmitHandler = () => {

        parentOnSubmitHandler(state)

    }

    const onInputChangeHandler = (e: any) => {
        setState((prev: any) => {
            return {
                ...prev, [e.target['name']]: e.target['value']
            }
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {state.isNewTable === true ? 'New Column' : 'Updating ' + state.tableName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Column Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="columnname"
                        name="columnName"
                        aria-label="columnname"
                        aria-describedby="basic-addon1"
                        value={state.tableName}
                        onChange={onInputChangeHandler}
                    ></FormControl>
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Column Label</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="column label"
                        name="columnLabel"
                        aria-label="displayname"
                        aria-describedby="basic-addon1"
                        value={state.displayName}
                        onChange={onInputChangeHandler}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Column Type</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="column type"
                        name="columnType"
                        aria-label="displayname"
                        aria-describedby="basic-addon1"
                        value={state.displayName}
                        onChange={onInputChangeHandler}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"outline-" + (state.isNewTable === true ? "success" : "primary")}
                    onClick={onSubmitHandler}>
                    {state.isNewTable === true ? 'Add New Column' : 'Update colimn'}
                </Button>
                <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const Index = (props: any) => {

    const [state, setState] = React.useState({ selectedItem: null });
    const updateState = (s: any) => {
        setState((prev: any) => {
            return { ...prev, s }
        })
    }
    const [tableModalState, setTableModalState] = React.useState({
        show: false,
        isNewTable: false,
        tableName: null,
        displayName: null
    });
    const [columnsModalState, setColumnsModalState] = React.useState({
        show: false,
    });
    const { AddNewTable, GetTableList } = UseMetadataServices()
    const tableList = GetTableList()

    const { SetCache, GetCache, ClearCache } = UseDatabaseCacheMethods();

    const onTableModalSubmitHandler = (data: any) => {
        setTableModalState((prev: any) => {
            return {
                ...prev, show: false
            }
        })
        if (data.isNewTable) {
            AddNewTable({
                tableName: data.tableName,
                display: data.displayName
            })
        }
        console.log('Table Modal submitted: ', data)
    }

    return (<React.Fragment>
        <Row style={{ height: '100%' }}>
            <Col style={{ backgroundColor: 'white' }} sm={2}>
                <ListGroup>
                    <ListGroup.Item><Link to="/settings/tables">Tables</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/settings/memory">Memory</Link></ListGroup.Item>
                </ListGroup>
            </Col>
            <Col sm={10}>
            <Route exact path="/settings">
                    <h3>Settings Page</h3>
                </Route>
                <Route path="/settings/tables" >
                   <TablesPage />
                </Route>
                <Route exact path="/settings/memory" >
                   <h3>Memory Page</h3>
                   <ListGroup>
                       <ListGroupItem onClick={SetCache}>Save Metadata</ListGroupItem>
                       <ListGroupItem onClick={GetCache}>Restore Metadata</ListGroupItem>
                       <ListGroupItem onClick={ClearCache}>Clear Metadata</ListGroupItem>
                   </ListGroup>
                </Route>
{/*  

                <h3>Settings Page</h3>
                <br />
                <div style={{ alignItems: 'left' }}>
                    <Button variant="outline-secondary"
                        style={{ minWidth: 150 }}
                        onClick={() => updateState({ isNewTable: (state.selectedItem === null), show: true })}>
                        {state.selectedItem === null ? 'Add New Table' : 'Update Table'}
                    </Button>{' '}
                    <Button variant="outline-secondary"
                        style={{ minWidth: 150 }}
                        disabled={state.selectedItem === null}
                        onClick={() => setColumnsModalState((prev: any) => {
                            return {
                                ...prev, show: true
                            }
                        })}>Edit Columns</Button>{' '}
                    <Button variant="outline-secondary"
                        style={{ minWidth: 150 }}
                        disabled={state.selectedItem === null}
                        onClick={() => setColumnsModalState((prev: any) => {
                            return {
                                ...prev, show: true
                            }
                        })}>Forms</Button>{' '}
                    <Button variant="outline-secondary"
                        style={{ minWidth: 150 }}
                        disabled={state.selectedItem === null}
                        onClick={() => setColumnsModalState((prev: any) => {
                            return {
                                ...prev, show: true
                            }
                        })}>Views</Button>{' '}
                    <Button variant="outline-danger"
                        style={{ minWidth: 150 }}
                        disabled={state.selectedItem === null}
                    >Delete Table</Button>{' '}
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
                                onDoubleClick={() => setTableModalState((prev: any) => {
                                    return {
                                        ...prev, isNewTable: false,
                                        show: true,
                                        tableName: x.tableName,
                                        displayName: x.displayName
                                    }
                                })}>
                                <td>{index + 1}</td>
                                <td>{x.tableName}</td>
                                <td>{x.displayName}</td>
                            </tr>
                        })}


                    </tbody>
                </Table>

                {state.selectedItem === "formslfheiwsfg" || true ?
                    null
                    : <FormDesigner tableName={state.selectedItem}></FormDesigner>
                }

                
            */}


            </Col>
        </Row>

{/*
        <TableModal style={{ width: '90%', height: '90%', maxWidth: '100%', maxHeight: '100%' }}
            data={tableModalState}
            show={tableModalState.show}
            onSubmit={onTableModalSubmitHandler}
            onHide={() => {
                setTableModalState((prev: any) => {
                    return {
                        ...prev, show: false
                    }
                })
            }}></TableModal>


        <ColumnModal style={{ width: '90%', height: '90%', maxWidth: '100%', maxHeight: '100%' }}
            data={columnsModalState}
            show={columnsModalState.show}
            onSubmit={onTableModalSubmitHandler}
            onHide={() => {
                setColumnsModalState((prev: any) => {
                    return {
                        ...prev, show: false
                    }
                })
            }}></ColumnModal>

            */}

    </React.Fragment>)


}

export default Index