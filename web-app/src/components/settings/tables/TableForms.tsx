import React from 'react'

export const _Template = (props: any) => {

    const [state, setState] =React.useState<any>({

    })

    React.useEffect(() => {
        setState((prev: any) => {
            return { ...prev }
        })
    }, [props])

    return (<React.Fragment>
        <h5>_Template</h5>

    </React.Fragment>)
}

export default _Template