import React from 'react'

import { Modal, Button } from 'react-bootstrap'

export const ModalBox = (props: any) => {
    //const parentState = props.state
    //const parentSetState = props.setState

    const [state, setState] = React.useState<any>({ show: false })

    const onCloseHandler = props.onHide || (() => setState((prev: any) => {
        return { ...prev, show: false }
    }))
    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev, show: (props.show === undefined ? prev.show : props.show ) }
        })
    }, [props])

    return (<React.Fragment>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title || 'Modal Box'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {...props.children}
            </Modal.Body>
            <Modal.Footer>
                {...props.actions}
                <Button variant="outline-dark" onClick={ onCloseHandler }>Close</Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>)
}

export default ModalBox