import * as React from 'react';
import { IConfigValueResult } from '../../models/ConfigValueResultModel';
import ReactTable from 'react-table';
import { readOnlyResultColumns } from '../../models/EntityDefinition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    editMode?: boolean;
    selectedValue?: string;
    data: IConfigValueResult[];
    onCancel?: () => void;
    onSave?: (modifiedConfigValues: IConfigValueResult[]) => void;
}

interface IState {
    data: IConfigValueResult[];
    modifiedRowIndex: number[];
    modifiedResults: IConfigValueResult[];
}

export class ManageConfigResult extends React.Component<IProps, IState> {
    static defaultProps = {
        editMode: false,
        selectedValue: ''
    };

    public state: IState = {
        data: this.props.data,
        modifiedRowIndex: [],
        modifiedResults: []
    };

    // clean up
    public componentWillUnmount() {
        this.setState({ modifiedRowIndex: [] });
    }

    // Render
    public render() {
        const columns = readOnlyResultColumns;
        return (
            <>
                {this.props.editMode && (
                    <div className="row">
                        <div className="col-12">{this.SaveCancel()}</div>
                    </div>
                )}
                <div className="row">
                    <div className="col-12">
                        <ReactTable
                            className=" -striped -highlight"
                            defaultPageSize={-1}
                            showPagination={false}
                            noDataText="No record found"
                            minRows={20}
                            style={{
                                height: '700px'
                                // This will force the table body to overflow
                                // and scroll, since there is not enough room
                            }}
                            data={this.props.data}
                            columns={columns}
                        />
                    </div>
                </div>
            </>
        );
    } // render

    private SaveCancel = () => {
        return (
            <div className="row m-1">
                <div className="col-3 table-header">
                    <span className="">
                        <button id="btnSave" type="button" className="btn btn-link btn-sm table-header" onClick={this.onSave}>
                            <FontAwesomeIcon className="mr-2" icon="save" title="Save Changes" /> Save changes
                        </button>
                    </span>
                    <span className="">
                        <button id="btnCancel" type="button" className="btn btn-link btn-sm table-header" onClick={this.onCancel}>
                            <FontAwesomeIcon className="mr-2" icon="ban" title="Cancel Changes" />
                            Cancel changes
                        </button>
                    </span>
                </div>
                <div className="col-9 table-header text-center">
                    <FontAwesomeIcon icon="info-circle" />
                    <label className="m-2 small" title="Click on the Config Value to edit">
                        Click on a cell/row to place it in edit mode. Use the Save changes or Cancel changes buttons to process/discard all changes at
                        once.
                    </label>
                </div>
            </div>
        );
    };

    private onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.setState({ modifiedRowIndex: [] });
    };

    private onSave = () => {
        if (this.props.onSave) {
            this.props.onSave(this.state.modifiedResults);
        }
    };
} // export
