import { format } from 'date-fns';

// this is a work around for filtering with case insensitive
// default filtering method is case sensitive and start with
// https://react-table.js.org/#/story/custom-filtering
export function filterCaseInsensitive(filter: any, row: any, method: string) {
    const id = filter.pivotId || filter.id;

    if (method === 'startwith') {
        // start with
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
    } else {
        // contains
        return row[id] !== undefined ? String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase()) : true;
    }
}

//
// Admin
//
export const ConfigColumns = [
    {
        Header: 'Config Key',
        accessor: 'configKey',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        width: 100,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Name',
        accessor: 'configName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Description',
        accessor: 'description',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        minWidth: 300,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Curo Server',
        accessor: 'curoDbServerKey',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Applog Server',
        accessor: 'applogDbServerKey',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

// configSetting table
export const ConfigSettingColumns = [
    {
        Header: 'Config Setting Key',
        accessor: 'configSettingKey',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Setting Name',
        accessor: 'configSettingName',
        headerClassName: 'bold-text bg-light text-left',
        className: 'small',
        width: 300,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Description',
        accessor: 'description',
        headerClassName: 'bold-text bg-light text-left',
        className: 'small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

// servers table
export const ServersColumns = [
    {
        Header: 'Servers Key',
        accessor: 'serversKey',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Servers Name',
        accessor: 'serverName',
        headerClassName: 'bold-text bg-light text-left',
        className: 'small',
        width: 300,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Servers Type',
        accessor: 'serverType',
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        maxWidth: 150,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        id: 'Active',
        Header: 'isActive',
        accessor: (d: any) => {
            return d.isActive ? 'Y' : '';
        },
        show: true,
        headerClassName: 'bold-text bg-light text-center ',
        className: 'text-center small',
        maxWidth: 150,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

//
// Manage Config
//
const baseResultColumns = [
    {
        Header: 'Config Value Key',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configValueKey',
        show: false,
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Key',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configKey',
        show: false,
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Setting Key',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configSettingKey',
        show: false,
        className: 'text-center small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Name',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configName',
        show: true,
        className: 'text-left small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Setting Name',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configSettingName',
        show: true,
        className: 'text-left small',
        width: 400,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

// concatenate to the baseResultColumns
let readOnlyResultColumns = [
    ...baseResultColumns,
    {
        Header: 'Config Value',
        headerClassName: 'bold-text bg-light text-left',
        accessor: 'configValue',
        show: true,
        className: 'text-left small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

// Read-Only Columns for ManageConfigResult
export { readOnlyResultColumns };

//
// History
//
const dateEnteredWidth = 150;
const actionWidth = 95;
const tlrWidth = 100;

export const ConfigEditColumns = [
    {
        id: 'dateEntered',
        Header: 'Date Entered',
        accessor: (d: any) => {
            return format(d.dateEntered, 'YYYY-MM-DD');
        },
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        maxWidth: dateEnteredWidth,
        sortable: true,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },
    {
        Header: 'Action',
        accessor: 'actionType',
        show: true,
        headerClassName: 'bold-text bg-light text-center ',
        className: 'text-center small',
        maxWidth: actionWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },
    {
        Header: 'TLR',
        accessor: 'tlr',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        maxWidth: tlrWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },
    {
        Header: 'Teller Name',
        accessor: 'tellerName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },
    {
        Header: 'Config Name',
        accessor: 'configName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },

    {
        Header: 'Description',
        accessor: 'description',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        minWidth: 300,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '') // work around solution
    },
    {
        Header: 'Config Edit Key',
        accessor: 'configEditKey',
        show: false,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Config Key',
        accessor: 'configKey',
        show: false,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Curo Server',
        accessor: 'curoDbServerKey',
        show: false,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Applog Server',
        accessor: 'applogDbServerKey',
        show: false,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },

    {
        id: 'isProduction',
        Header: 'Production',
        accessor: (d: any) => {
            return d.isProduction ? 'Y' : '';
        },
        show: true,
        headerClassName: 'bold-text bg-light text-center ',
        className: 'text-center small',
        maxWidth: 150,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

export const ConfigSettingEditColumns = [
    {
        id: 'dateEntered',
        Header: 'Date Entered',
        accessor: (d: any) => {
            return format(d.dateEntered, 'YYYY-MM-DD');
        },
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        maxWidth: dateEnteredWidth
    },
    {
        Header: 'Action',
        accessor: 'actionType',
        show: true,
        headerClassName: 'bold-text bg-light text-center ',
        className: 'text-center small',
        maxWidth: actionWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'TLR',
        accessor: 'tlr',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        maxWidth: tlrWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Teller Name',
        accessor: 'tellerName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },

    {
        Header: 'Config Setting Name',
        accessor: 'configSettingName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        minWidth: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Description',
        accessor: 'description',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        minWidth: 350,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];

export const ConfigValueEditColumns = [
    {
        id: 'dateEntered',
        Header: 'Date Entered',
        accessor: (d: any) => {
            return d.dateEntered.toDateString();
        },
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-center small',
        maxWidth: dateEnteredWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Action Type',
        accessor: 'actionType',
        show: true,
        headerClassName: 'bold-text bg-light text-center ',
        className: 'text-center small',
        width: actionWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'TLR',
        accessor: 'tlr',
        show: true,
        headerClassName: 'bold-text bg-light text-center',
        className: 'text-center small',
        maxWidth: tlrWidth,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },
    {
        Header: 'Teller Name',
        accessor: 'tellerName',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    },

    {
        Header: 'Config Value',
        accessor: 'configValue',
        show: true,
        headerClassName: 'bold-text bg-light text-left',
        className: 'text-left small',
        width: 200,
        filterable: true,
        filterMethod: (filter: any, row: any) => filterCaseInsensitive(filter, row, '')
    }
];
