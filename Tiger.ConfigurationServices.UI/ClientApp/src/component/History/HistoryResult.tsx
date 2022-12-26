import * as React from 'react';
import ReactTable from 'react-table';
import { ConfigEditColumns, ConfigSettingEditColumns, ConfigValueEditColumns } from '../../models/EntityDefinition';
import { ViewBy } from '../../models/Enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    detailId: string;
    data: any[];
}

interface IState {}

export class HistoryResult extends React.Component<IProps, IState> {
    public render(): JSX.Element {
        const columns = this.getColumns(this.props.detailId);

        return (
            <>
                <div className="row ">
                    <div className="col">
                        <ReactTable
                            className=" -striped -highlight"
                            defaultPageSize={25}
                            showPagination={true}
                            showPageJump={true}
                            filterable={true}
                            noDataText="No Record Found"
                            style={{ height: '700px' }}
                            data={this.props.data}
                            columns={columns}
                            getTdProps={this.getTdProps}
                        />
                    </div>
                </div>
            </>
        );
    }

    private getColumns = (detailId: string) => {
        switch (detailId) {
            case ViewBy.Config:
                return ConfigEditColumns;
            case ViewBy.Setting:
                return ConfigSettingEditColumns;
            case ViewBy.Value:
                return ConfigValueEditColumns;
            default:
                return;
        }
    };

    private getTdProps = (rowInfo: any, column: any) => {
        // to capture a value from an individual column use this syntax:
        // "column.row.<your_variable_name>" or "column.original.<your_variable_name>"

        // Definition of column:
        //
        // column.index 	- row index number
        // column.original 	- original column values for the selected row
        // column.row		- column values for the selected row

        if (column.row.isProduction === 'Y') {
            column.row.isProduction = <FontAwesomeIcon icon="check" className="text-danger" />;
        }
        return {};
    };
} // export
