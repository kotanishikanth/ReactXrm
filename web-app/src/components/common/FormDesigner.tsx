import React from 'react'
import { UseMetadataServices } from '../../contexts/database-context'

import { FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup } from 'react-bootstrap'

export const FormDesigner = (props: any) => {

    const { GetTable } = UseMetadataServices()

    const [state, setState] = React.useState<any>({
        table: null,
        allColumns: [],
        columnsOnForm: [],
        currentDraggingItem: null
    })

    const dragHandler = (columnName: string, e: any) => {
        e.dataTransfer.setData('item', e.target.width)
        // console.log("Drag", e);
        setState((prev: any) => {
            return { ...prev, currentDraggingItem: columnName ? columnName : null }
        })
    };

    const dropHandler = (e: any) => {
        e.preventDefault();
        //console.log("Drag Over", e);
        if (state.currentDraggingItem) {
            setState((prev: any) => {
                return {
                    ...prev,
                    currentDraggingItem: null,
                    columnsOnForm: [
                        ...prev.columnsOnForm,
                        prev.allColumns.filter((x: any) => x.columnName == prev.currentDraggingItem)[0]
                    ]
                }
            })
        }
    };

    const dragOverHandler = (e: any) => {
        e.preventDefault();
        //console.log("Drag Over", e);
    };

    React.useEffect(() => {
        var table = GetTable(props.tableName)
        if (table) {
            setState((prev: any) => {
                return { ...prev, table, allColumns: Object.values(table.columns) }
            })
        }
    }, [props])

    return (<React.Fragment>
        <h5>Form Designer - editing {state.table?.tableName}</h5>
        <Row style={{ width: '95%' }}>
            <Col sm={2}>
                <ListGroup >
                    {state.allColumns.map((column: any) => {
                        return <ListGroup.Item draggable style={{ userSelect: 'none' }} key={column.columnName} onDragStart={e => dragHandler(column.columnName, e)}>
                            {column.columnLabel}
                        </ListGroup.Item>
                    })
                    }
                </ListGroup>
            </Col>
            <Col sm={10} style={{ backgroundColor: 'lightgray', padding: 5 }}>
                <div style={{ userSelect: 'none', minWidth: 300, minHeight: 400, backgroundColor: 'white' }} >
                    <h3>{state.table?.displayName} Form</h3>
                    <Row style={{ userSelect: 'none', width: 200, minHeight: 300, backgroundColor: 'lightgrey', margin: 5 }}
                        onDrop={(e: any) => dropHandler(e)}
                        onDragOver={(e: any) => dragOverHandler(e)}
                    >
<ListGroup style={{width: '95%' }}>
                        {state.columnsOnForm.map((column: any) => {
                            return <React.Fragment>
                                <ListGroup.Item key={column.columnName + "_" + Math.floor(Math.random() * 100)} style={{ margin: 2, padding:2, width: '100%' }}>
                                    {column.columnName}
                                </ListGroup.Item>
                                {/* 
                                <ListGroup.Item key={column.columnName + "_" + Math.floor(Math.random() * 100)} style={{ margin: 2, padding:2, width: '100%' }}>
                                </ListGroup.Item>
                                */}
                            </React.Fragment>
                        })}
                        </ListGroup>

                    </Row>
                </div>
            </Col>
        </Row>
    </React.Fragment>)
}

export default FormDesigner