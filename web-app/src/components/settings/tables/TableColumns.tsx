import React from 'react'

import { useLocation, useHistory, Route, Link, useRouteMatch,
    useParams } from 'react-router-dom';

export const TableColumns = (props: any) => {

    console.log('TableColumns:', useRouteMatch(), useParams());

    const [state, setState] =React.useState<any>({

    })

    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev }
        })
    }, [props])

    return (<React.Fragment>
        <h5>TableColumns</h5>

    </React.Fragment>)
}

export default TableColumns