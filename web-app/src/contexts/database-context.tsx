import React from "react";

type ColumnMetadataType = {
    columnName: string
    columnLabel: string
    columnType: 'text' | 'number' | 'lookup' | 'datetime'
}

type TableMetadataType = {
    tableName: string
    displayName: string
    columns: ColumnMetadataType[]
}
type MetadataType = {
    tables: { [key: string]: TableMetadataType }
}

type DatabaseContextStateType = {
    metadata: MetadataType,
    data: any
}

type DatabaseContextType = {
    state: DatabaseContextStateType,
    setState: (state: DatabaseContextStateType | ((prev: any) => DatabaseContextStateType)) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({

    state: {
        metadata: { tables: {} },
        data: []
    },
    setState: state => console.warn('setState prototype method')
})

export const UseMetadataServices = () => {

    const { state, setState } = React.useContext(DatabaseContext);

    const GetAllTableNames = () => {
        return Object.keys(state.metadata.tables);
    }

    const GetTableList = () => {
        return Object.values(state.metadata.tables).map((x:TableMetadataType) => {
            return {
                tableName: x.tableName,
                displayName: x.displayName
            }
        });
    }

    const AddNewTable = (table: any) => {

        if (!table["tableName"]) throw new Error('TableName cannot be empty')

        if (state.metadata.tables[table["tableName"]])
            throw new Error('Table ' + table["tableName"] + ' already exists')

        var _table: TableMetadataType = {
            "tableName": table["tableName"],
            "displayName": table["displayName"] || table["tableName"].replace(/^\w/, (c: string) => c.toUpperCase()),
            "columns": [
                { columnName: 'id', columnLabel: (table["displayName"] + ' ID'), columnType: 'number' }
            ]
        }

        setState((prev: DatabaseContextStateType) => {
            return {
                ...prev,
                metadata: {
                    ...prev.metadata,
                    tables: { ...prev.metadata.tables, [table["tableName"]]: _table }
                }
            }
        })
    }

    const DeleteTable = (tableName: string) => {

        if (state.metadata.tables[tableName]) {
            setState((prev: DatabaseContextStateType) => {

                var _metadataTables = prev.metadata.tables
                delete _metadataTables[tableName]

                return {
                    ...prev,
                    data: { ...prev.data, [tableName]: [] },
                    metadata: {
                        ...prev.metadata,
                        tables: _metadataTables
                    }
                }
            })
        }
        else throw new Error('Table ' + tableName + ' doesnot exists')
    }

    const AddNewColumn = (column: ColumnMetadataType) => {

    }

    return {
        AddNewTable,
        DeleteTable,
        GetAllTableNames,
        GetTableList
    }
}


const DatabaseContextProvider = ((props?: any) => {
    const [state, setState] = React.useState<DatabaseContextStateType>({
        metadata: {
            tables: {
                'contact': {
                    tableName: 'contact', displayName: 'Contact', columns: [
                        { columnName: 'id', columnLabel: 'ContactId', columnType: 'number' },
                        { columnName: 'firstname', columnLabel: 'First Name', columnType: 'text' },
                        { columnName: 'lastname', columnLabel: 'Last Name', columnType: 'text' },
                    ]
                }
            }
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