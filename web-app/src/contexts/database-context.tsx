import React from "react";

export type ColumnMetadataType = {
    columnName: string
    columnLabel: string
    columnType: 'text' | 'number' | 'lookup' | 'datetime'
    tableRef?: string   // for lookup
}

export type RelatedTableType = {
    tableName: string
    columnName: string
}

export type TableMetadataType = {
    tableName: string
    displayName: string
    primaryColumnName?: string
    columns: { [key: string]: ColumnMetadataType }
    relatedTables: RelatedTableType[]
}

type TableFormMetadata = {

}

type TableViewMetadata = {

}

type MetadataType = {
    tables: { [key: string]: TableMetadataType },
    forms: TableFormMetadata[],
    views: TableViewMetadata[],
}

type DatabaseContextStateType = {
    metadata: MetadataType,
    data: any
}

const EmptyDatabaseContextStateType: DatabaseContextStateType = {
    metadata: { tables: {}, forms: [], views: [] },
    data: []
}


export const EmptyTableMetadataType: TableMetadataType = { tableName: '', displayName: '', primaryColumnName: '', columns: {}, relatedTables: [] }

export const EmptyColumnMetadataType: ColumnMetadataType = { columnName: '', columnLabel: '', columnType: 'text' }

const PredefinedDatabaseContextStateType: DatabaseContextStateType = {
    metadata: {
        tables: {
            'account': {
                tableName: 'account', displayName: 'Account', primaryColumnName: 'name', columns: {
                    id: { columnName: 'id', columnLabel: 'AccountId', columnType: 'number' },
                    name: { columnName: 'name', columnLabel: 'Account Name', columnType: 'text' },
                    createdby: { columnName: 'createdby', columnLabel: 'Created By', columnType: 'lookup', tableRef: 'user' },
                    createdon: { columnName: 'createdon', columnLabel: 'Created On', columnType: 'datetime' },
                },
                relatedTables: [
                    { tableName: 'case', columnName: 'relatedaccount' },
                    { tableName: 'contact', columnName: 'company' },
                ]
            },
            'case': {
                tableName: 'case', displayName: 'Case', primaryColumnName: 'casenumber', columns: {
                    id: { columnName: 'id', columnLabel: 'CaseId', columnType: 'number' },
                    casenumber: { columnName: 'casenumber', columnLabel: 'Case Number', columnType: 'number' },
                    title: { columnName: 'title', columnLabel: 'Case Title', columnType: 'text' },
                    description: { columnName: 'description', columnLabel: 'Description', columnType: 'text' },
                    relatedaccount: { columnName: 'relatedaccount', columnLabel: 'Company', columnType: 'lookup', tableRef: 'account' },
                    relatedcontact: { columnName: 'relatedcontact', columnLabel: 'Customer', columnType: 'lookup', tableRef: 'contact' },
                    status: { columnName: 'status', columnLabel: 'Status', columnType: 'text' },
                    createdby: { columnName: 'createdby', columnLabel: 'Created By', columnType: 'lookup', tableRef: 'user' },
                    createdon: { columnName: 'createdon', columnLabel: 'Created On', columnType: 'datetime' },
                },
                relatedTables: []
            },
            'contact': {
                tableName: 'contact', displayName: 'Contact', primaryColumnName: 'fullname', columns: {
                    id: { columnName: 'id', columnLabel: 'ContactId', columnType: 'number' },
                    fullname: { columnName: 'fullname', columnLabel: 'Full Name', columnType: 'text' },
                    firstname: { columnName: 'firstname', columnLabel: 'First Name', columnType: 'text' },
                    lastname: { columnName: 'lastname', columnLabel: 'Last Name', columnType: 'text' },
                    company: { columnName: 'company', columnLabel: 'Company', columnType: 'lookup', tableRef: 'account' },
                    createdby: { columnName: 'createdby', columnLabel: 'Created By', columnType: 'lookup', tableRef: 'user' },
                    createdon: { columnName: 'createdon', columnLabel: 'Created On', columnType: 'datetime' },
                },
                relatedTables: [
                    { tableName: 'case', columnName: 'relatedcontact' },
                ]
            },
            'user': {
                tableName: 'user', displayName: 'User', primaryColumnName: 'fullname', columns: {
                    id: { columnName: 'id', columnLabel: 'ContactId', columnType: 'number' },
                    fullname: { columnName: 'fullname', columnLabel: 'Full Name', columnType: 'text' },
                    firstname: { columnName: 'firstname', columnLabel: 'First Name', columnType: 'text' },
                    lastname: { columnName: 'lastname', columnLabel: 'Last Name', columnType: 'text' },
                    email: { columnName: 'email', columnLabel: 'Email', columnType: 'text' },
                    phone: { columnName: 'phone', columnLabel: 'Phone', columnType: 'text' },
                    createdby: { columnName: 'createdby', columnLabel: 'Created By', columnType: 'lookup', tableRef: 'user' },
                    createdon: { columnName: 'createdon', columnLabel: 'Created On', columnType: 'datetime' },
                },
                relatedTables: [
                    { tableName: 'account', columnName: 'createdby' },
                    { tableName: 'case', columnName: 'createdby' },
                    { tableName: 'contact', columnName: 'createdby' },
                    { tableName: 'user', columnName: 'createdby' },
                ]
            }
        },
        forms: [],
        views: []
    },
    data: {}
}

type DatabaseContextType = {
    state: DatabaseContextStateType,
    setState: (state: DatabaseContextStateType | ((prev: any) => DatabaseContextStateType)) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({

    state: EmptyDatabaseContextStateType,
    setState: state => console.warn('setState prototype method')
})

export const UseMetadataServices = () => {

    const { state, setState } = React.useContext(DatabaseContext);

    const GetAllTableNames = () => {
        return Object.keys(state.metadata.tables);
    }

    const GetTableList = () => {
        return Object.values(state.metadata.tables).map((x: TableMetadataType) => {
            return {
                tableName: x.tableName,
                displayName: x.displayName
            }
        });
    }

    const GetTable = (tableName: string): TableMetadataType => {
        var _table = state.metadata.tables[tableName]
        if (_table) return _table
        else throw new Error("Table " + tableName + " doesn't exist")
    }

    // eslint-disable-next-line
    const TableExists = (tableName: string): boolean => {
        if (state.metadata.tables[tableName]) return true
        else return false
    }

    const AddNewTable = (table: any) => {
        const tableName = table["tableName"]
        debugger;
        if (!table["tableName"]) throw new Error('TableName cannot be empty')

        if (state.metadata.tables[table["tableName"]])
            throw new Error('Table ' + table["tableName"] + ' already exists')

        var _table: TableMetadataType = {
            "tableName": table["tableName"],
            "displayName": table["displayName"] || table["tableName"].replace(/^\w/, (c: string) => c.toUpperCase()),
            "columns": {
                id: { columnName: 'id', columnLabel: (table["displayName"] + ' ID'), columnType: 'number' }
            },
            "relatedTables": []
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

    const GetColumnList = (tableName: string) => {
        var _table = GetTable(tableName)
        return Object.values(_table.columns).map((x: ColumnMetadataType) => {
            return {
                columnName: x.columnName,
                columnLabel: x.columnLabel,
                columnType: x.columnType,
                tableRef: x.tableRef,
            }
        });
    }

    const GetColumn = (tableName: string, columnName: string) => {
        var _table = GetTable(tableName)
        var columns = Object.values(_table.columns).filter((x: ColumnMetadataType) => columnName === x.columnName).map((x: ColumnMetadataType) => {
            return {
                columnName: x.columnName,
                columnLabel: x.columnLabel,
                columnType: x.columnType
            }
        });
        return columns.length > 0 ? columns[0] : null;
    }

    const GetRelatedTables = (tableName: string) => {
        var _table = GetTable(tableName)
        return _table.relatedTables
    }

    const UpdateTable = (table: any) => {

        if (!table["tableName"]) throw new Error('TableName cannot be empty')

        var _table: TableMetadataType = GetTable(table["tableName"])

        _table = {
            ..._table,
            "tableName": table["tableName"],
            "displayName": table["displayName"] || table["tableName"].replace(/^\w/, (c: string) => c.toUpperCase()),
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

    const UpsertColumn = (tableName: string, column: ColumnMetadataType) => {
        var _table = GetTable(tableName)
        if (!column.columnName) throw new Error("Column name cannot be empty")
        _table = {
            ..._table,
            columns: { ..._table.columns, [column.columnName]: column }
        }
        setState((prev: DatabaseContextStateType) => {
            return {
                ...prev,
                metadata: {
                    ...prev.metadata,
                    tables: { ...prev.metadata.tables, [tableName]: _table }
                }
            }
        })
    }

    const DeleteColumn = (tableName: string, columnName: string) => {
        var _table = GetTable(tableName)
        if (!Object.keys(_table.columns).includes(columnName)) throw new Error("Column name " + columnName + " doesn't exists")
        var _columns = _table.columns
        delete _columns[columnName]
        _table = {
            ..._table,
            columns: _columns
        }
        setState((prev: DatabaseContextStateType) => {
            return {
                ...prev,
                metadata: {
                    ...prev.metadata,
                    tables: { ...prev.metadata.tables, [tableName]: _table }
                }
            }
        })
    }

    return {
        GetAllTableNames,
        GetTableList,
        GetTable,
        AddNewTable,
        UpdateTable,
        DeleteTable,
        GetColumnList,
        GetColumn,
        GetRelatedTables,
        UpsertColumn,
        DeleteColumn
    }
}


const DatabaseContextProvider = ((props?: any) => {
    const [state, setState] = React.useState<DatabaseContextStateType>(PredefinedDatabaseContextStateType);

    return (
        <DatabaseContext.Provider value={{ state, setState }}>
            {props.children}
        </DatabaseContext.Provider>
    );
})

export const UseDatabaseContext = () => React.useContext(DatabaseContext);

export const UseDatabaseCacheMethods = () => {
    const { state, setState } = React.useContext(DatabaseContext);

    const SetCache = () => {
        var jsonString = JSON.stringify(state.metadata);
        localStorage.setItem('METADATA', jsonString);
    }

    const GetCache = () => {
        var jsonString: string = localStorage.getItem('METADATA') || JSON.stringify(PredefinedDatabaseContextStateType);
        var metadata = JSON.parse(jsonString);
        setState({ metadata, data: [] });
    }

    const ClearCache = () => {
        localStorage.removeItem('METADATA');
        setState(PredefinedDatabaseContextStateType);
    }


    const GetMetadataSize = () => {
        const obj = Object.values(state.metadata)
        var recurse = function (value: any) {
            var bytes = 0;

            if (typeof value === 'boolean') {
                bytes = 4;
            }
            else if (typeof value === 'string') {
                bytes = value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes = 8;
            }
            else if
                (
                typeof value === 'object'
                && obj.indexOf(value) === -1
            ) {
                obj[obj.length] = value;

                for (var i in value) {
                    bytes += 8; // an assumed existence overhead
                    bytes += recurse(value[i])
                }
            }

            return bytes;
        }

        return recurse(obj);
    }

    const GetDataSize = () => {
        const obj = Object.values(state.data)
        var recurse = function (value: any) {
            var bytes = 0;

            if (typeof value === 'boolean') {
                bytes = 4;
            }
            else if (typeof value === 'string') {
                bytes = value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes = 8;
            }
            else if
                (
                typeof value === 'object'
                && obj.indexOf(value) === -1
            ) {
                obj[obj.length] = value;

                for (var i in value) {
                    bytes += 8; // an assumed existence overhead
                    bytes += recurse(value[i])
                }
            }

            return bytes;
        }

        return recurse(obj);
    }

    return {
        SetCache,
        GetCache,
        ClearCache,
        GetMetadataSize,
        GetDataSize
    }
}

export default DatabaseContextProvider