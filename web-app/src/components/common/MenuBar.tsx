import React from 'react'


import { Tabs, Tab, Form, FormControl, InputGroup, Modal, Table, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'


export type MenuBarItemType = {
    name?: string
    label: string
    front?:boolean
    hidden?: boolean
    disabled?: boolean
    onClick?: any
    variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "light" | "info" | "dark" | "link"
    onRight?: boolean
}

export type MenuBarItemCollection = {
    [key: string]: MenuBarItemType
}

export const MenuBarItem = (props: any) => {
    if(props.hidden === true) return null;
    return (<React.Fragment>
    <Button
        variant={"outline-" + (props.variant || "secondary")}
        disabled={props.disabled === true}
        onClick={props.onClick || (() => null)}
        style={{ float: (props.onRight ? 'right' : 'none') }}
    >{props.children}
    </Button>{" "}
    </React.Fragment>)
}

export const MenuBar = (props: any) => {

    const [state, setState] = React.useState<any>({
        buttons: {}
    })

    React.useEffect(() => {

        setState((prev: any) => {
            return { ...prev, buttons: props.items }
        })
    }, [props])

    return (<React.Fragment>
        <br />
        <div style={{ alignItems: 'left' }}>
            {
                Object.values<MenuBarItemType>(state.buttons).filter((button: MenuBarItemType) => button.onRight !== true && button.front === true).map((button: MenuBarItemType) => {
                    console.log(button)
                    return <MenuBarItem 
                    variant={button.variant}
                    onClick={button.onClick}
                    disabled={button.disabled} 
                    hidden={button.hidden} 
                    onRight={button.onRight}
                    style={props.style}>{button.label}</MenuBarItem>
                })
            }
            {props.children}
            {
                Object.values<MenuBarItemType>(state.buttons).filter((button: MenuBarItemType) => button.onRight !== true && button.front !== true).map((button: MenuBarItemType) => {
                    console.log(button)
                    return <MenuBarItem 
                    variant={button.variant}
                    onClick={button.onClick}
                    disabled={button.disabled} 
                    hidden={button.hidden} 
                    onRight={button.onRight}
                    style={props.style}>{button.label}</MenuBarItem>
                })
            }
            {
                Object.values<MenuBarItemType>(state.buttons).filter((button: MenuBarItemType) => button.onRight === true).map((button: MenuBarItemType, i:number) => {
                    return <MenuBarItem key={button.name || i}
                    variant={button.variant}
                    onClick={button.onClick}
                    disabled={button.disabled} 
                    hidden={button.hidden} 
                    onRight={button.onRight}
                    style={props.style}>{button.label}</MenuBarItem>
                })
            }
        </div>
        <br />
    </React.Fragment>)
}

export default MenuBar