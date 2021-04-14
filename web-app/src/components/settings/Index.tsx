import React from 'react'

import { FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { UseMetadataServices } from '../../contexts/database-context'

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

    const onInputChangeHandler = (e:any) => {
        setState((prev:any) => {
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
                    {state.isNewTable == true ? 'New Table' : 'Updating ' + state.tableName}
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
                    variant={"outline-" + (state.isNewTable == true ? "success" : "primary")}
                    onClick={onSubmitHandler}>
                    {state.isNewTable == true ? 'Add New Table' : 'Update table' }
                </Button>
                <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const Index = (props: any) => {

    const [tableModalState, setTableModalState] = React.useState({
        show: false,
        isNewTable: false,
        tableName: null,
        displayName: null
    });
    const { AddNewTable, GetTableList } = UseMetadataServices()
    const tableList = GetTableList()

    const onTableModalSubmitHandler = (data: any) => {
        setTableModalState((prev: any) => {
            return {
                ...prev, show: false
            }
        })
        if(data.isNewTable) {
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
                    <ListGroup.Item>Tables</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col sm={10}>
                <h3>Settings Page</h3>
                <br />
                <div style={{ alignItems: 'left' }}>
                    <Button variant="outline-secondary" onClick={() => setTableModalState((prev: any) => {
                        return {
                            ...prev, isNewTable: true, show: true
                        }
                    })}>Add New Table</Button>{' '}
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
                            return <tr key={x.tableName} onDoubleClick={() => setTableModalState((prev: any) => {
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


            </Col>
        </Row>

        <TableModal style={{width: '90%', height:'90%', maxWidth: '100%', maxHeight: '100%'}}
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
    </React.Fragment>)
}

export default Index