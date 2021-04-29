import React from 'react'


import { Tabs, Tab, Form, FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

export type MenuBarItem = {
    name?: string
    label: string
    disabled?: boolean
    onClick?: any
    style?: "primary" | "secondary" | "success" | "warning" | "danger" | "light" | "info" | "dark" | "link"
    onRight?: boolean
}

export type MenuBarItemCollection = {
    [key:string]: MenuBarItem
}

export const MenuBar = (props: any) => {

    const [state, setState] = React.useState<any>({
        buttons: {}
    })

    React.useEffect(() => {

        var buttons:any = {}
        Object.entries(props.items).forEach((item: any) => {
            
            var name = item[0];
            var _item = {
                name,
                label: item[1].label,
                disabled: item[1].disabled === true,
                onClick: item[1].onClick || (() => null),
                style: item[1].style || "secondary",
                onRight: item[1].onRight === true
            }
            buttons = { ...buttons, [name.toLowerCase()]: _item };
        });
        
        setState((prev: any) => {
            return { ...prev, buttons }
        })
    }, [props])

    return (<React.Fragment>
        <br />
        <div style={{ alignItems: 'left' }}>
            {
                Object.values<MenuBarItem>(state.buttons).map((button: MenuBarItem) => {
                    return (<React.Fragment key={button.name}>
                    <Button 
                        variant={"outline-" + button.style}
                        disabled={button.disabled}
                        onClick={button.onClick}
                        style={{ float: (button.onRight ? 'right' : 'none') }}
                    >{button.label}
                    </Button>{" "}
                    </React.Fragment> )
                })
            }

        </div>
        <br />
    </React.Fragment>)
}

export default MenuBar