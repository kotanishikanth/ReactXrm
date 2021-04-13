import React from "react";

type ColumnMetadataType = {
    columnName: string
    columnLabel: string
    columnType: 'text' | 'number' | 'lookup'
}

type TableMetadataType = {
    tableName: string
    displayName:string
    columns: ColumnMetadataType[]
}
type MetadataType = {
    tables: TableMetadataType[]
}

type DatabaseContextStateType = {
    metadata: MetadataType,
    data: any
}

type DatabaseContextType = {
    state: any,
    setState: (state: any | ((prev: any) => any)) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({

    state: {
        metadata: {}
    },
    setState: state => console.warn('setState prototype method')
})

const DatabaseContextProvider = ((props?: any) => {
    const [state, setState] = React.useState<DatabaseContextStateType>({
        metadata: {
            tables: [{
                tableName: 'contact', displayName: 'Contact', columns: [
                    {columnName:'id', columnLabel: 'contact', columnType: 'number'},
                    {columnName:'firstname', columnLabel: 'First Name', columnType: 'text'},
                    {columnName:'lastname', columnLabel: 'Last Name', columnType: 'text'},
                ]
            }]
        },
        data: {}
    });

    return (
        <DatabaseContext.Provider value={{ state, setState }}>
            {props.children}
        </DatabaseContext.Provider>
    );
})

export const UseDatabaseContext = () => React.useContext(DatabaseContext);

export default DatabaseContextProvider