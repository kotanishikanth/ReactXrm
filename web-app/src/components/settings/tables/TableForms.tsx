import React from 'react'


import {
    useLocation, useHistory, Route, Link, useRouteMatch,
    useParams
} from 'react-router-dom';
import { UseMetadataServices } from '../../../contexts/database-context';
import MenuBar, { MenuBarItem } from '../../common/MenuBar';

export const TableForms = (props: any) => {

    const history = useHistory();
    const urlPrefix = '/settings/tables/'
    const { tableName } = (useParams() as any)

    const [state, setState] =React.useState<any>({
        selectedItem: null,
        menuBarButtons: {
            "close": {
                label: 'Close',
                onClick: () => history.push(urlPrefix + tableName),
                onRight: true
            }
        }
    })

    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev }
        })
    }, [props])

    return (<React.Fragment>
         <MenuBar items={state.menuBarButtons} >
            <MenuBarItem
                variant="primary"
                onClick={() => {
                    history.push(urlPrefix + tableName + "/forms/new-form")
                }}>Add Form</MenuBarItem>

            <MenuBarItem
                disabled={state.selectedItem == null}
                onClick={() => {
                    history.push(urlPrefix + tableName + "/forms/" + state.selectedItem)
                }}>Modify</MenuBarItem>

            <MenuBarItem
                disabled={state.selectedItem == null}
                onClick={() => null}>Delete</MenuBarItem>
        </MenuBar>

    </React.Fragment>)
}

export default TableForms